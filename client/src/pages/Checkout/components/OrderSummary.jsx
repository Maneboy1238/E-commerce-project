import { dayMonthDateFormat } from "../../../utils/date"
import { DeliveryOptions } from "./DeliveryOption"
import { CartItemDetail } from "./CartItemDetail"
export function OrderSummary({ cart, deliveryOptions }) {
  return (
    <div className="order-summary">
      {cart.map(cartItem => (
        <div key={cartItem.productId} className="cart-item-container">
          <div className="delivery-date">
            Delivery date: {deliveryOptions && (
              dayMonthDateFormat(
                deliveryOptions.find(deliveryOption => deliveryOption.id === cartItem.id)
                  ?.estimatedDeliveryTimeMs)
            )}
          </div>

          <div className="cart-item-details-grid">
            <CartItemDetail cartItem={cartItem} />
            <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} />
          </div>
        </div>

      ))}

    </div>
  )
}
