import { getDict } from "@/lib/i18n";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/config";

// "Train your team" box on news articles (2026-10-17). The site's readers include the people who
// buy team training; this sends them to the matching page on aimanjack.com (Jack's training business),
// tagged with UTM so the referral shows up in aimanjack's analytics.
type Target = keyof Dict["training"]["labels"];

const PATHS: Record<Target, string> = {
  hub: "/ai-training/",
  workshop: "/ai-training/team-workshop/",
  sales: "/ai-training/sales-teams/",
  marketing: "/ai-training/marketing-teams/",
  operations: "/ai-training/operations-teams/",
  leadership: "/ai-training/leadership-teams/",
  claude: "/ai-training/claude/",
  chatgpt: "/ai-training/chatgpt/",
  copilot: "/ai-training/copilot/",
};

// First match wins: a named tool beats a department; anything unmatched goes to the training hub.
const RULES: [RegExp, Target][] = [
  [/claude|anthropic|skills/, "claude"],
  [/chatgpt|openai|agentkit|custom-gpt/, "chatgpt"],
  [/microsoft|copilot-studio|m365/, "copilot"],
  [/sales|lead-qualification|sdr|prospect|crm|outreach/, "sales"],
  [/marketing|marketers|market-research|content|social-media|seo|geo-|competitive/, "marketing"],
  [/invoice|expense|meeting|email|gmail|calendar|to-do|slack|document|data-analysis|customer-support|customer-service|accountant|bookkeep|workspace/, "operations"],
  [/founder|roi|cost|pricing|guardrail|policy|human-in-the-loop|ai-employees|evaluate|deploy|fail|security|identity|for-work/, "leadership"],
];

export function trainingTarget(slug: string): Target {
  const s = slug.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  return RULES.find(([re]) => re.test(s))?.[1] ?? "hub";
}

export function TrainingCta({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getDict(locale).training;
  const target = trainingTarget(slug);
  const href =
    `https://aimanjack.com${locale === "zh" ? "/zh" : ""}${PATHS[target]}` +
    `?utm_source=realagentusecases&utm_medium=referral&utm_campaign=article_cta&utm_content=${encodeURIComponent(slug)}`;
  return (
    <aside
      className="mt-16 mx-auto max-w-[var(--container-prose)] rounded-xl border border-(--color-brand)/40 px-6 py-8 sm:px-8"
      aria-label="Team training"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-(--color-muted-foreground)">{t.eyebrow}</p>
      <p className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight">{t.heading}</p>
      <p className="mt-3 text-(--color-muted-foreground)">{t.body}</p>
      <p className="mt-5">
        <a href={href} rel="noopener" className="font-medium text-(--color-brand) underline underline-offset-4">
          {t.labels[target]} →
        </a>
        <span className="ml-2 text-sm text-(--color-muted-foreground)">{t.note}</span>
      </p>
    </aside>
  );
}
