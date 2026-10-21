export function getDeliveryDate(deliveryDays) {
  const date = new Date()
  date.setDate(date.getDate() + deliveryDays);

  return date.getTime()

}
