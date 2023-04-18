export const getLastYearRange = (count: number): number[] => {
  const currentYear = new Date().getFullYear();
  const range = Array.from({ length: count + 1 }, (_, i) => currentYear - i);
  return range;
};
