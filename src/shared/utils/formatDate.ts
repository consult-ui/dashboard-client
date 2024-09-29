export const formatDate = (date: string | undefined | number, onlyTime?: boolean) => {
  if (!date) return '-';
  const result = new Date(date).toLocaleString('ru');
  if (onlyTime) return result.split(', ')[1];
  return result;
};
