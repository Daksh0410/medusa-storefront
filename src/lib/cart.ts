import medusaClient from "./medusa"

export async function getOrCreateCart(): Promise<string> {
  let cartId = localStorage.getItem("cart_id")

  if (cartId) {
    try {
      await medusaClient.carts.retrieve(cartId)
      return cartId
    } catch {
      localStorage.removeItem("cart_id")
    }
  }

  const cart = await medusaClient.carts.create({
    sales_channel_id: "sc_01K10QXCWT3ZDQYVG5S7ZYH7DV", // ✅ Added
  })

  localStorage.setItem("cart_id", cart.cart.id)
  return cart.cart.id
}

export async function addItemToCart(productId: string, quantity: number = 1) {
  const cartId = await getOrCreateCart()

  await medusaClient.carts.lineItems.create(cartId, {
    variant_id: productId,
    quantity,
  })

  return cartId
}
