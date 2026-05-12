/**
 * Email Triage Agent
 * --------------------------------
 * Runs every morning at 7am Central via time-based trigger.
 * Reads inbox emails from the last 24h, asks Claude to prioritize,
 * emails Jack the resulting to-do list.
 *
 * One-time setup:
 *   1. File > Project Properties > Script Properties:
 *      add CLAUDE_API_KEY = sk-ant-api03-...
 *   2. Run setUp() once (it will ask for permissions, approve them)
 *   3. The trigger fires every day at 7am after that.
 */

const CLAUDE_MODEL = 'claude-sonnet-4-5-20250929';
const HOURS_LOOKBACK = 24;
const MAX_EMAILS = 50;
const MAX_SNIPPET_CHARS = 1500;

const SYSTEM_PROMPT = `You are an executive assistant for Jack Qian — Industrial Engineer at Texas Instruments transitioning into Business Planning, based in Dallas.

You will receive a batch of emails from the last ${HOURS_LOOKBACK} hours. Your job is to triage them and produce a prioritized to-do list Jack can act on while drinking his morning coffee.

OUTPUT FORMAT — strict markdown, in this exact structure:

# Daily Triage — [today's date]

[1-sentence summary: total emails, how many need action]

## 🔴 URGENT — handle in next 2 hours
- **[email subject]** from [sender] — [1-sentence action + why urgent]

## 🟡 IMPORTANT — handle today
- **[email subject]** from [sender] — [1-sentence action]

## ⚡ QUICK — under 5 minutes each
- **[subject]** from [sender] — [the quick action]

## 📎 FYI — no action, just be aware
- [subject] — [1-line note]

## 🗑️ SKIPPED (not shown)
[count of low-value newsletters/automated noise filtered out]

RULES:
1. URGENT = explicit deadline today, urgent ask from a manager/director, time-sensitive scheduling.
2. IMPORTANT = decisions Jack must make today, requests with this-week deadlines, follow-ups Jack promised.
3. QUICK = simple acknowledgments, FYI replies, calendar accepts.
4. FYI = informational, no action needed.
5. SKIP entirely: marketing newsletters, automated notifications (Jira, GitHub, calendar reminders for past events), promotional emails. Just count them in the SKIPPED section.

Be concise. Jack reads this on his phone. < 1500 words total. No filler, no "I noticed", no "It looks like" — direct action language.`;

function dailyEmailTriage() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY');
  if (!apiKey) {
    throw new Error('CLAUDE_API_KEY not set in Script Properties.');
  }

  // 1. Fetch last 24h of inbox emails
  const cutoffMs = Date.now() - HOURS_LOOKBACK * 60 * 60 * 1000;
  const cutoffSec = Math.floor(cutoffMs / 1000);
  const threads = GmailApp.search(`in:inbox after:${cutoffSec}`, 0, MAX_EMAILS);

  const emails = [];
  for (const thread of threads) {
    for (const msg of thread.getMessages()) {
      if (msg.getDate().getTime() < cutoffMs) continue;
      emails.push({
        from: msg.getFrom(),
        subject: msg.getSubject(),
        date: msg.getDate().toISOString(),
        threadLength: thread.getMessageCount(),
        snippet: msg.getPlainBody().slice(0, MAX_SNIPPET_CHARS),
      });
    }
  }

  if (emails.length === 0) {
    Logger.log('No new emails in last 24h. Skipping send.');
    return;
  }

  // 2. Compose user message
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const userMessage =
    `Today is ${today}. Here are ${emails.length} emails from the last ${HOURS_LOOKBACK} hours:\n\n` +
    emails
      .map(
        (e, i) =>
          `### Email ${i + 1}\nFrom: ${e.from}\nDate: ${e.date}\nSubject: ${e.subject}\nThread length: ${e.threadLength}\n\nBody snippet:\n${e.snippet}\n\n---`,
      )
      .join('\n\n');

  // 3. Call Claude
  const response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    payload: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (response.getResponseCode() !== 200) {
    Logger.log(`Claude API error: ${response.getContentText()}`);
    throw new Error(`Claude returned ${response.getResponseCode()}`);
  }

  const result = JSON.parse(response.getContentText());
  const digest = result.content[0].text;

  // 4. Email yourself the digest
  const myEmail = Session.getActiveUser().getEmail();
  GmailApp.sendEmail(
    myEmail,
    `📬 Daily Inbox Triage — ${today}`,
    digest, // plain-text fallback
    {
      htmlBody: digestToHtml(digest),
      name: 'Inbox AI',
      noReply: true,
    },
  );

  Logger.log(`Sent triage of ${emails.length} emails to ${myEmail}.`);
}

/** Tiny markdown-to-HTML converter. Not perfect, but enough for daily emails. */
function digestToHtml(md) {
  return md
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.*)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n\n/g, '<br><br>');
}

/**
 * Run this ONCE manually after pasting the script.
 * It registers the daily 7am trigger.
 */
function setUp() {
  // Clear any old triggers for this function so we don't double-fire.
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (t.getHandlerFunction() === 'dailyEmailTriage') ScriptApp.deleteTrigger(t);
  });

  ScriptApp.newTrigger('dailyEmailTriage')
    .timeBased()
    .atHour(7)
    .everyDays(1)
    .inTimezone('America/Chicago')
    .create();

  Logger.log('✅ Trigger registered: dailyEmailTriage every day at 7am Central.');
}

/** Helper for manual testing. Run this to send yourself a digest immediately. */
function testRun() {
  dailyEmailTriage();
}
