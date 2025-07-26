"use client"

import { useEffect, useState } from "react"
import { medusa } from "@/lib/medusa"
import Link from "next/link"
import type { PricedProduct } from "@medusajs/client-types"

export default function HomePage() {
  const [products, setProducts] = useState<PricedProduct[]>([])

  useEffect(() => {
    medusa.products
      .list()
      .then(({ products }) => {
        setProducts(products as unknown as PricedProduct[])
      })
      .catch((err) => {
        console.error("Error fetching products:", err)
      })
  }, [])

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const price =
            product.variants?.[0]?.prices?.[0]?.amount ?? 0
          const currency =
            product.variants?.[0]?.prices?.[0]?.currency_code?.toUpperCase() ?? "INR"

          return (
            <div
              key={product.id}
              className="group border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <Link href={`/product/${product.handle}`}>
                <img
                  src={product.thumbnail || "/placeholder.png"}
                  alt={product.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="p-4 flex flex-col justify-between h-[200px]">
                <Link
                  href={`/product/${product.handle}`}
                  className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1"
                >
                  {product.title}
                </Link>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {product.description || "No description available."}
                </p>
                <div className="mt-2 text-base font-bold text-gray-900">
                  ₹{(price / 100).toFixed(2)} {currency}
                </div>
                <Link
                  href={`/product/${product.handle}`}
                  className="mt-3 inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
                >
                  View Product
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
