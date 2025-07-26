"use client"

import { useCartDrawer } from "@/stores/useCartDrawer"
import { useEffect, useState } from "react"
import medusaClient from "@/lib/medusa"
import Link from "next/link"

export default function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawer()
  const [cart, setCart] = useState<any>(null)

  useEffect(() => {
    const fetchCart = async () => {
      const cartId = localStorage.getItem("cart_id")
      if (cartId) {
        const res = await medusaClient.carts.retrieve(cartId)
        setCart(res.cart)
      }
    }

    if (isOpen) fetchCart()
  }, [isOpen])

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={closeDrawer} className="text-gray-500 hover:text-black">✕</button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
        {cart?.items?.length ? (
          cart.items.map((item: any) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="text-sm font-semibold">
                  ₹{(item.unit_price / 100).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      <div className="p-4 border-t">
        <Link
          href="/cart"
          onClick={closeDrawer}
          className="block w-full text-center bg-black text-white py-2 rounded"
        >
          Go to Cart
        </Link>
      </div>
    </div>
  )
}
