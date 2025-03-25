export function formatToCAD(price: number) {
  return price.toLocaleString("en-CA");
}

export function formatToTimeAgo(date: string) {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const deta = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("en");
  return formatter.format(deta, "days");
}
