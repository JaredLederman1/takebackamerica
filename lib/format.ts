export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

/** Keeps quotation marks from becoming a headline line by themselves. */
export function formatHeadline(title: string) {
  return title
    .replace(/([“"])(?=\S)/g, "$1\u2060")
    .replace(/(?<=\S)([”"])/g, "\u2060$1");
}
