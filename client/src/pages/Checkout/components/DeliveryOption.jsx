import { convertCentsToDollarsInTwoDecimals } from "../../../utils/money"
import { dayMonthDateFormat } from "../../../utils/date"
export function DeliveryOptions({ deliveryOptions, cartItem }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {deliveryOptions.map(deliveryOption => (
        <div key={deliveryOption.id} className="delivery-option">
          <input type="radio" checked={cartItem.deliveryOptionId === deliveryOption.id ? true : false}
            className="delivery-option-input"
            name={`delivery-option-${cartItem.productId}`} />
          <div>
            <div className="delivery-option-date">
              {dayMonthDateFormat(deliveryOption.estimatedDeliveryTimeMs)}
            </div>
            <div className="delivery-option-price">
              {deliveryOption.priceCents === 0 ?
                'FREE Shipping' :
                `${convertCentsToDollarsInTwoDecimals(deliveryOption.priceCents)} - Shipping`}
            </div>
          </div>
        </div>

      ))}
    </div>
  )
}
