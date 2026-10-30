import { Header } from "../../components/Header/Header";
import { OrdersGrid } from "./components/OrdersGrid";
import "./OrdersPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then(response => {
        setOrders(response.data)
        console.log(response.data)
      })
  }, [])
  return (
    <>
      <link rel="icon" type="image/png" href="orders-favicon.png" />
      <title>Orders</title>


      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} />
      </div>
    </>
  )
}
