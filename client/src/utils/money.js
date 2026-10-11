export function convertCentsToDollarsInTwoDecimals(amountCents) {
  return `$${(amountCents / 100).toFixed(2)}`
}
