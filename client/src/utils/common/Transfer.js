export function transDate(day, hour) {
  const year = day.split("-")[0];
  const month = day.split("-")[1];
  const date = day.split("-")[2];
  const getHour = hour ? `${hour}시` : "";

  return `${year}년 ${month}월 ${date}일 ${getHour}`;
}
