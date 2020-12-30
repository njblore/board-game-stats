export const dateRegex = /[0-3]\d[/|-][0-1]\d[/|-][1-2]\d\d\d/;
export const dateFromString = (date: string): Date => {
  const [day, month, year] = date.split(new RegExp('/|-'));
  return new Date(Number(year), Number(month) - 1, Number(day));
};
