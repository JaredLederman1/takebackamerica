import type { ReactNode } from "react";

type ArticleHeadlineProps = {
  title: string;
};

export default function ArticleHeadline({ title }: ArticleHeadlineProps) {
  const quotedPhrase = /(["“][^"”]+["”])/;
  const parts = title.split(quotedPhrase);

  return parts.map((part, index): ReactNode => (
    quotedPhrase.test(part)
      ? <span className="headline-quoted" key={index}>{part}</span>
      : part
  ));
}
