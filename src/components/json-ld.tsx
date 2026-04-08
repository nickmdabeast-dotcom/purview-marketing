/**
 * Safe JSON-LD script injector.
 *
 * Serializes structured-data objects into a `<script type="application/ld+json">`
 * tag. Escapes `<` as `\u003c` so author content (FAQ questions, article
 * titles, etc.) can never break out of the script tag — JSON.stringify alone
 * is not enough if content happens to contain the literal string `</script>`.
 *
 * This component is the ONLY place in the blog subsystem that uses
 * dangerouslySetInnerHTML — callers pass in plain objects.
 */
interface JsonLdProps {
  data: Record<string, unknown>;
}

function safeSerialize(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safeSerialize(data) }}
    />
  );
}
