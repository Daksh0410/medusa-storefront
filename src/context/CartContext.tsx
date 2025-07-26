"use client"

import { createContext, useContext, useState } from "react"
import type { CartItem } from "@/types/cart"

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
