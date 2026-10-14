import express from "express";
import cors from "cors";
import { join } from "path"
import { products } from "./utils/products.js";
import { cart } from "./utils/cart.js";
import { deliveryOptions } from "./utils/deliveryOption.js";

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

app.get('/api/delivery-options', (req, res) => {
  const { expand } = req.query
  if (expand === 'estimatedDeliveryTime') {
    const deliveryOptionsWithDeliveryTimeMs = deliveryOptions.map(deliveryOption => {
      const { deliveryDays } = deliveryOption;
      const date = new Date()
      date.setDate(date.getDate() + deliveryDays);

      const estimatedDeliveryTimeMs = date.getTime()
      return {
        ...deliveryOption,
        estimatedDeliveryTimeMs
      }
    })
    return res.json(deliveryOptionsWithDeliveryTimeMs)
  }
  res.json(deliveryOptions);
})

app.get('/api/payment-summary', (req, res) => {
  let totalItems = 0;
  let productCostCents = 0;
  let shippingCostCents = 0;
  cart.forEach(cartItem => {
    totalItems += cartItem.quantity
    const product = products.find(product => product.id === cartItem.productId)
    productCostCents += product.priceCents * cartItem.quantity;
    const deliveryOption = deliveryOptions.find(deliveryOption => deliveryOption.id === cartItem.deliveryOptionId);
    shippingCostCents += deliveryOption.priceCents
  });
  const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
  const taxCents = totalCostBeforeTaxCents * 0.1;
  const totalCostCents = totalCostBeforeTaxCents + taxCents;

  const paymentSummary = {
    totalItems,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents
  }
  console.log(paymentSummary)
  res.json(paymentSummary)
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
