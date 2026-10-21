import { convertCentsToDollarsInTwoDecimals } from "../../../utils/money"
import { dayMonthDateFormat } from "../../../utils/date"
import { DeliveryOptions } from "./DeliveryOption"
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
            <img className="product-image"
              src={cartItem.product.image} />

            <div className="cart-item-details">
              <div className="product-name">
                {cartItem.product.name}
              </div>
              <div className="product-price">
                {convertCentsToDollarsInTwoDecimals(cartItem.product.priceCents)}
              </div>
              <div className="product-quantity">
                <span>
                  Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                </span>
                <span className="update-quantity-link link-primary">
                  Update
                </span>
                <span className="delete-quantity-link link-primary">
                  Delete
                </span>
              </div>
            </div>
            <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} />
          </div>
        </div>

      ))}

    </div>
  )
}
