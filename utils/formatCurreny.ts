export function formatCurrencyShort(amountInUSD: number): string {
  if (Number.isNaN(amountInUSD)) {
    return "None";
  }
  if (amountInUSD >= 1e12) {
    // Convert to trillions
    const amountInTrillions = amountInUSD / 1e12;
    return "$ " + amountInTrillions.toFixed(2) + " T";
  } else if (amountInUSD >= 1e9) {
    // Convert to billions
    const amountInBillions = amountInUSD / 1e9;
    return "$ " + amountInBillions.toFixed(2) + " B";
  } else if (amountInUSD >= 1e6) {
    // Convert to millions
    const amountInMillions = amountInUSD / 1e6;
    return "$ " + amountInMillions.toFixed(2) + " M";
  } else {
    // Use the original value if it's less than 1 million
    return "$ " + amountInUSD.toFixed(2) + " USD";
  }
}
