import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
      <p className="text-gray-600 mb-8">
        {`Sorry, we couldn't find the product you're looking for.`}
      </p>
      <Link
        href="/products"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Back to Products
      </Link>
    </div>
  );
}
