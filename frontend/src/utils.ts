export function formatNumber(num: number): string {
  if (num >= 1000) {
    const remainder = num % 1000;
    const div = (num / 1000).toFixed();
    if (remainder > 0) {
      return div.toString() + "." + remainder.toString()[0] + "K";
    }
    return div.toString() + "K";
  }
  return num.toString();
}
