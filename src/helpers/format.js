export const format = (number) => {
  return new Intl.NumberFormat("es-ES", 
    { 
      style: "currency", 
      currency: "EUR" 
    }).format(number);
}