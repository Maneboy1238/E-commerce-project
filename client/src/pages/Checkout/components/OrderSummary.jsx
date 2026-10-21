import { convertCentsToDollarsInTwoDecimals } from "../../../utils/money"
import { dayMonthDateFormat } from "../../../utils/date"
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
          </div>
        </div>

      ))}

    </div>
  )
}
