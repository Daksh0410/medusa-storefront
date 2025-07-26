export default function NotFoundPage() {
  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">404 - Product Not Found</h1>
      <p className="text-gray-600 mb-6">
        The product you’re looking for doesn’t exist or was removed.
      </p>
      <a href="/" className="text-blue-500 hover:text-blue-700 underline text-sm">
        ← Back to products
      </a>
    </main>
  )
}