export const convertTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
};  