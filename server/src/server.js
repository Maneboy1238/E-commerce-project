import express from "express";
import cors from "cors";
import { products } from "./utils/products.js";

const app = express()
app.use(cors({
  origin: "http://localhost:5173"
}))
app.get('/api/products', (req, res) => {
  res.json(products)
})
app.listen(3000, () => {
  console.log('listening on port 3000')
})
