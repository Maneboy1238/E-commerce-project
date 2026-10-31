import { DeliveryOptions } from "./DeliveryOption"
import { CartItemDetail } from "./CartItemDetail"
import { DeliveryDate } from "./DeliveryDate"
export function OrderSummary({ cart, deliveryOptions }) {
  return (
    <div className="order-summary">
      {cart.map(cartItem => (
        <div key={cartItem.productId} className="cart-item-container">
          <DeliveryDate deliveryOptions={deliveryOptions} cartItem={cartItem} />
          <div className="cart-item-details-grid">
            <CartItemDetail cartItem={cartItem} />
            <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} />
          </div>
        </div>

      ))}

    </div>
  )
}
