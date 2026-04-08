import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { FAQSchema } from "./faq-schema";

type AnchorProps = ComponentPropsWithoutRef<"a">;

function MdxLink({ href, children, ...props }: AnchorProps) {
  if (!href) return <a {...props}>{children}</a>;

  const isExternal = /^https?:\/\//.test(href);
  const isAnchor = href.startsWith("#");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  }

  if (isAnchor) {
    return (
      <a
        href={href}
        className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary transition-colors"
    >
      {children}
    </Link>
  );
}

/**
 * Component map passed to <MDXRemote /> to style markdown elements in the
 * site's dark theme. Headings get scroll-margin so anchor links land below
 * the fixed nav. Code blocks rely on rehype-pretty-code (Shiki) for token
 * coloring; we just style the surrounding chrome.
 */
export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="text-4xl md:text-5xl font-bold tracking-tight text-text-main mt-12 mb-6 scroll-mt-24"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="text-2xl md:text-3xl font-bold tracking-tight text-text-main mt-14 mb-5 scroll-mt-24"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="text-xl md:text-2xl font-semibold text-text-main mt-10 mb-4 scroll-mt-24"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="text-lg md:text-xl font-semibold text-text-main mt-8 mb-3 scroll-mt-24"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-base md:text-[17px] leading-[1.75] text-text-main/90 my-5" {...props} />
  ),
  a: MdxLink,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="list-disc list-outside pl-6 my-5 space-y-2 text-text-main/90 marker:text-primary/70"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="list-decimal list-outside pl-6 my-5 space-y-2 text-text-main/90 marker:text-primary/70"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-[1.75]" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-2 border-primary/60 pl-6 my-8 italic text-text-muted bg-surface/40 py-4 pr-4 rounded-r-md"
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-border-dark to-transparent" />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-text-main" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="italic text-text-main/90" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    // Inline code (block-level <pre><code> is rewritten by rehype-pretty-code).
    <code
      className="rounded-md bg-surface-elevated/70 border border-border-dark/60 px-1.5 py-0.5 text-[0.9em] font-mono text-primary-light"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-7 overflow-x-auto rounded-xl border border-border-dark/70 bg-[#0d1117] p-5 text-sm leading-[1.7] font-mono shadow-[0_8px_28px_rgba(0,0,0,0.45)]"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border-dark/70 bg-surface/30">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-surface-elevated/70" {...props} />
  ),
  tbody: (props: ComponentPropsWithoutRef<"tbody">) => (
    <tbody className="divide-y divide-border-dark/50" {...props} />
  ),
  tr: (props: ComponentPropsWithoutRef<"tr">) => (
    <tr className="even:bg-surface/30" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="px-4 py-3 text-left font-semibold text-text-main border-b border-border-dark/60"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="px-4 py-3 align-top text-text-main/85" {...props} />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    // Plain img is fine for in-content blog images; next/image isn't worth
    // the ergonomics hit when we don't know the dimensions ahead of time.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-8 w-full rounded-xl border border-border-dark/60"
      loading="lazy"
      alt={props.alt ?? ""}
      {...props}
    />
  ),
  FAQSchema,
};
