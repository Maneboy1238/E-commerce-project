export function calculateProductCostCents(cartItem, product) {
  let productCostCents = 0;
  productCostCents += product.priceCents * cartItem.quantity;
  return productCostCents
}

export function calculateShippingCostCents(deliveryOption) {
  let shippingCostCents = 0;
  shippingCostCents += deliveryOption.priceCents
  return shippingCostCents
}
