import { dayMonthDateFormat } from "../../../utils/date"
export function DeliveryDate({ deliveryOptions, cartItem }) {
  if (!deliveryOptions) return;
  const deliveryOptionDetails = deliveryOptions.find(deliveryOption => deliveryOption.id === cartItem.deliveryOptionId)
  const estimatedDeliveryTimeMs = deliveryOptionDetails.estimatedDeliveryTimeMs;
  const deliveryDate = dayMonthDateFormat(estimatedDeliveryTimeMs)

  return (
    <div className="delivery-date">
      Delivery date:  {deliveryDate} </div>

  )
}
