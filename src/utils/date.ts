const getStartAndEndOfCurrentDay = () => {
  const now = new Date();

  // Start of the day: set hours, minutes, seconds, and milliseconds to 0
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // End of the day: set hours to 23, minutes and seconds to 59, and milliseconds to 999
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999,
  );

  return { startOfDay, endOfDay };
};

export { getStartAndEndOfCurrentDay };
