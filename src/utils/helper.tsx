

export function formatCurrency(value, currency = 'NGN') {
    return new Intl.NumberFormat('en-US', {
    //   style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }