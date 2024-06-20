

export function formatCurrency(value, currency = 'NGN') {
    return new Intl.NumberFormat('en-US', {
    //   style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  export function trimString(str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 3) + '...';
    }
    return str;
}
