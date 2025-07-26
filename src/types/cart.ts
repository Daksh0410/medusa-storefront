import type { ProductVariant } from "@medusajs/client-types"

export interface CartItem {
  productId: string
  variant: ProductVariant
  title: string
  thumbnail: string | null
  currency: string
  price: number
}