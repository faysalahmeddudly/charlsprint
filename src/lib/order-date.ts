const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export function formatOrderDate(dateString: string) {
  const date = new Date(dateString)
  const day = String(date.getUTCDate()).padStart(2, "0")
  const month = MONTHS[date.getUTCMonth()]
  const year = date.getUTCFullYear()
  return `${day} ${month}, ${year}`
}

export function formatOrderDateTime(dateString: string) {
  const date = new Date(dateString)
  const day = String(date.getUTCDate()).padStart(2, "0")
  const month = MONTHS[date.getUTCMonth()]
  const year = date.getUTCFullYear()
  const hours = String(date.getUTCHours()).padStart(2, "0")
  const minutes = String(date.getUTCMinutes()).padStart(2, "0")
  return `${day} ${month} ${year} - ${hours}:${minutes}`
}
