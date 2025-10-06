export function formatDate(dateStr) {
  const date = new Date(dateStr)
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return new Intl.DateTimeFormat('es-ES', options).format(date)
}