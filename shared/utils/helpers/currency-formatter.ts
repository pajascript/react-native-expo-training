export const formatCurrency = (value: number | string | null | undefined, currency: string = "USD") => {
  try {
    const amount = typeof value === "string" ? Number(value) : value;
    if (amount == null || Number.isNaN(amount)) {
      return "$0.00";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    const formattedValue = typeof value === "number" ? value.toFixed(2) : "0.00";
    return `$${formattedValue}`;
  }
}
