// Renders a JSON-LD structured-data script tag. Server component — the data
// is serialized at build time (static export).

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
