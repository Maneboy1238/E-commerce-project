import express from "express";
import cors from "cors";
import { join } from "path"
import { products } from "./utils/products.js";
import { cart } from "./utils/cart.js";
import { deliveryOptions } from "./utils/deliveryOption.js";
import { getDeliveryDate } from "./utils/date.js";
import { calculateProductCostCents, calculateShippingCostCents } from "./utils/money.js";

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
      const estimatedDeliveryTimeMs = getDeliveryDate(deliveryDays)
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
  let totalCostCents = 0
  let totalItems = 0;
  let productCostCents = 0;
  let shippingCostCents = 0;
  cart.forEach(cartItem => {
    totalItems += cartItem.quantity
    const product = products.find(product => product.id === cartItem.productId)
    const deliveryOption = deliveryOptions.find(deliveryOption => deliveryOption.id === cartItem.deliveryOptionId);
    productCostCents += calculateProductCostCents(cartItem, product);
    shippingCostCents += calculateShippingCostCents(deliveryOption)
  });
  const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
  const taxCents = totalCostBeforeTaxCents * 0.1;
  totalCostCents = totalCostBeforeTaxCents + taxCents;

  const paymentSummary = {
    totalItems,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents
  }
  res.json(paymentSummary)
})

app.get("/api/orders", (req, res) => {
  const { expand } = req.query;
  let productCostCents = 0;
  let shippingCostCents = 0;
  const productCart = cart.map(cartItem => {
    const productData = products.find(product => product.id === cartItem.productId);
    const deliveryOption = deliveryOptions.find(deliveryOption => deliveryOption.id === cartItem.deliveryOptionId);
    const estimatedDeliveryTimeMs = getDeliveryDate(deliveryOption.deliveryDays)
    productCostCents += calculateProductCostCents(cartItem, productData);
    shippingCostCents += calculateShippingCostCents(deliveryOption)

    return {
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      estimatedDeliveryTimeMs,
      product: {
        name: productData?.name,
        image: productData?.image,
        priceCents: productData?.priceCents,
        keywords: productData?.keywords
      }
    }
  })
  const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
  const taxCents = totalCostBeforeTaxCents * 0.1;
  const totalCostCents = totalCostBeforeTaxCents + taxCents;
  const orders = [
    {
      id: crypto.randomUUID(),
      orderTimeMs: Date.now(),
      totalCostCents,
      products: productCart
    }
  ]
  res.json(orders)
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
