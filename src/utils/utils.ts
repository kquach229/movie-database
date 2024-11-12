export const ellipsize = (text: string, characterLimit: number) => {
  if (text.length > characterLimit)
    return `${text.substring(0, characterLimit)}...`;
  return text;
};

export function formatCurrency(amount: number, countryCode: string) {
  const formatter = new Intl.NumberFormat(countryCode, {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(amount);
}

export function formatMovieTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // Add leading zero to minutes if needed
  const formattedMinutes =
    remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;

  return `${hours}h ${formattedMinutes}m`;
}
