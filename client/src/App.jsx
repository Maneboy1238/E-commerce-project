import axios from 'axios'
import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react'
import { HomePage } from './pages/HomePage/HomePage'
import { CheckoutPage } from './pages/Checkout/CheckoutPage'
import { OrdersPage } from './pages/Orders/OrdersPage'
import { TrackingPage } from './pages/Tracking/TrackingPage'
import { NotFoundPage } from './pages/NotFound/NotFound.jsx'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  useEffect(() => {
    async function fetchCart() {
      const response = await axios.get("/api/cart-items?expand-product")
      setCart(response.data)
    }
    fetchCart()
  }, [])
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} />} />
      <Route path='orders' element={<OrdersPage cart={cart} />} />
      <Route path='tracking' element={<TrackingPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
