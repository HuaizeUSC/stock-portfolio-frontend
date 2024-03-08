export default function formatTimestamp(timestamp) {
  timestamp = timestamp;

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date(timestamp);
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${hour}:${minute}:${second} ${month} ${day}, ${year}`;
}

export function formatTimestampDay(timestamp) {
  timestamp = timestamp / 1000000;
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date(timestamp);
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
