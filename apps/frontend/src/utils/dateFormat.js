export function formatDate(date) {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return formattedDate;
}
