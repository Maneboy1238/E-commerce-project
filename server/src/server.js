import express from "express";
import cors from "cors";
import { join } from "path"
import { products } from "./utils/products.js";
import { cart } from "./utils/cart.js";

const app = express()
app.use(cors({
  origin: "http://localhost:5173"
}))

app.use(express.static(join(import.meta.dirname, '../public')))

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/cart-items', (req, res) => {
  const expandProduct = req.query['expand-product']
  console.log(expandProduct)
  if (expandProduct === '') {
    const cartWithProduct = cart.map(cartItems => {
      const product = products.find(product => product.id === cartItems.productId)
      return {
        ...cartItems,
        product: {
          name: product.name,
          image: product.image,
          priceCents: product.priceCents,
          keywords: product.keywords
        }
      }
    })
    return res.json(cartWithProduct)
  }
  res.json(cart)
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
