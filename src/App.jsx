import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage/HomePage'
import { CheckoutPage } from './pages/Checkout/CheckoutPage'
import { OrdersPage } from './pages/Orders/OrdersPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckoutPage />} />
      <Route path='orders' element={<OrdersPage />} />
    </Routes>
  )
}

export default App
