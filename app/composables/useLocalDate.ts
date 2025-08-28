const useLocalDate = (
  date: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  locale: string = 'fr-FR',
): string => {
  return new Date(date).toLocaleDateString(locale, options);
};

export default useLocalDate;
