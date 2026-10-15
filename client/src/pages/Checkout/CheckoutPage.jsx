import axios from "axios";
import { useEffect, useState } from "react";
import { CheckoutHeader } from "./Header/CheckoutHeader";
import "./CheckoutPage.css";
import { convertCentsToDollarsInTwoDecimals } from "../../utils/money";
import { dayMonthDateFormat } from "../../utils/date";

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState()
  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then(response => {
        setDeliveryOptions(response.data)
      })
    axios.get('/api/payment-summary')
      .then(response => setPaymentSummary(response.data))
  }, [])
  return (
    <>
      <link rel="icon" type="image/png" href="cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
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

          {paymentSummary && (
            <div className="payment-summary">
              <div className="payment-summary-title">
                Payment Summary
              </div>

              <div className="payment-summary-row">
                <div>Items ({paymentSummary.totalItems}):</div>
                <div className="payment-summary-money">{convertCentsToDollarsInTwoDecimals(paymentSummary.productCostCents)}</div>
              </div>

              <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">{convertCentsToDollarsInTwoDecimals(paymentSummary.shippingCostCents)}</div>
              </div>

              <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">{convertCentsToDollarsInTwoDecimals(paymentSummary.totalCostBeforeTaxCents)}</div>
              </div>

              <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">{convertCentsToDollarsInTwoDecimals(paymentSummary.taxCents)}</div>
              </div>

              <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">{convertCentsToDollarsInTwoDecimals(paymentSummary.totalCostCents)}</div>
              </div>

              <button className="place-order-button button-primary">
                Place your order
              </button>
            </div>

          )}
        </div>
      </div>
    </>
  )
}
