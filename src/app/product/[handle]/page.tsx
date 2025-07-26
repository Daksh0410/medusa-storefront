"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { medusaClient } from "@/lib/medusa-client"
import { addItemToCart } from "@/lib/cart"

const ProductPage = () => {
  const params = useParams()
  const handle = params?.handle as string

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!handle || typeof handle !== "string") return

    const fetchProduct = async () => {
      try {
        const response = await medusaClient.products.list()
        const matched = response.products.find((p) => p.handle === handle)
        if (!matched) throw new Error("No product matched with handle")
        setProduct(matched)
      } catch (err: any) {
        console.error("❌ Failed to fetch product", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [handle])

  const handleAddToCart = async () => {
  try {
    if (!product?.variants?.[0]?.id) {
      alert("No variant available")
      return
    }

    const variantId = product.variants[0].id
    console.log("📦 Adding Variant ID:", variantId)  // ✅ LOG HERE

    await addItemToCart(variantId, 1)
    alert("✅ Product added to cart")
  } catch (err) {
    console.error("❌ Add to cart failed:", err)
    alert("❌ Failed to add to cart")
  }
}


  if (loading) return <div className="p-4">Loading...</div>
  if (!product) return <div className="p-4">Product not found</div>

  const variant = product.variants?.[0]
  const price = variant?.prices?.[0]?.amount

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <img
        src={product.thumbnail || "/placeholder.png"}
        alt={product.title || "Product image"}
        className="w-full h-auto max-w-md mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">
        ₹{price ? (price / 100).toFixed(2) : "N/A"}
      </p>
      <button
        className="bg-black text-white px-6 py-2 rounded"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductPage