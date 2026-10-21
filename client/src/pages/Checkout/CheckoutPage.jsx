import axios from "axios";
import { useEffect, useState } from "react";
import { CheckoutHeader } from "./Header/CheckoutHeader";
import "./CheckoutPage.css";
import { convertCentsToDollarsInTwoDecimals } from "../../utils/money";
import { OrderSummary } from "./components/OrderSummary";

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
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
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
