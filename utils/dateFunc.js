const isBirthdayToday = (date) => {
  const today = new Date();
  const birthday = new Date(date);
  return (
    today.getDate() === birthday.getDate() &&
    today.getMonth() === birthday.getMonth()
  );
};

module.exports = { isBirthdayToday };
