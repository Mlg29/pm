

export function formatCurrency(value, currency = 'NGN') {
    return new Intl.NumberFormat('en-US', {
    //   style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }