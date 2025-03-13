export function formatCurrency(value, currency = 'NGN') {
  return new Intl.NumberFormat('en-US', {
    //   style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

export function trimString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + '...'
  }
  return str
}

export const convertToPST = (utcDate) => {
  const date = new Date(utcDate);
  return date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
};

export const convertToUserTime = (dateString, time) => {
  const [day, month, year] = dateString.split('.').map(Number);
  const [hours, minutes] = time.split(':').map(Number);

  const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));

  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${dateString} - ${formattedTime}`;
};

export const formatImageSrc = async (value: any): Promise<void> => {
  // const transformedUrl = transformUrl(value);
  await fetch(value)
    .then((response) => response.json())
    .then((data) => {
      return `data:image/png;base64,${data[0]?.base64}`
    })
}

// const transformUrl = (url) => {
//   const SportSportBaseUrl = "http://data2.goalserve.com:8084";
//   return url.replace(SportSportBaseUrl, "/api/");
// };

// const fetchLogo = async (url, url2) => {
//   const transformedUrl = transformUrl(url);
//   const transformedUrl2 = transformUrl(url2);
//   await fetch(transformedUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       setHomeLogo(data[0]?.base64)
//     });
//   await fetch(transformedUrl2)
//     .then((response) => response.json())
//     .then((data) => {
//       setAwayLogo(data[0]?.base64)
//     });
// }