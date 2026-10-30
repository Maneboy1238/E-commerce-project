import axios from "axios";
import { useEffect, useState } from "react";
import { CheckoutHeader } from "./Header/CheckoutHeader";
import "./CheckoutPage.css";
import { OrderSummary } from "./components/OrderSummary";
import { PaymentSummary } from "./components/PaymentSummary";

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState()
  useEffect(() => {
    async function fetchDeliveryOptions() {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      setDeliveryOptions(response.data)
    }

    async function fetchPaymentSummary() {
      const response = await axios.get('/api/payment-summary')
      setPaymentSummary(response.data)
    }

    fetchDeliveryOptions()
    fetchPaymentSummary()
  }, [])
  return (
    <>
      <link rel="icon" type="image/png" href="cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  )
}
