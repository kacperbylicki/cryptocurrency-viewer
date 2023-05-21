export const formatNumber = (number: number, isPercentage = false) => {
  if (isPercentage) {
    return `${Math.round(number * 100) / 100}%`;
  } else if (number < 1) {
    return `$${Math.round(number * 1000000) / 1000000}`;
  } else {
    return `$${Math.round(number * 100) / 100}`;
  }
};
