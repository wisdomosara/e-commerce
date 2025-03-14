import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CollectionSection from "@/components/composed/landing/CollectionSection";
import NewArrivals from "@/components/composed/landing/NewArrivals";

export default function Home() {
  // Dummy featured products data
  const featuredProducts = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      price: 299.99,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
      category: "Electronics",
    },
    {
      id: 2,
      title: "Leather Weekend Bag",
      price: 199.99,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800",
      category: "Fashion",
    },
    {
      id: 3,
      title: "Smart Watch Series 5",
      price: 399.99,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800",
      category: "Electronics",
    },
  ];

  // Collections data with more items
  const collections = [
    {
      id: 1,
      name: "Summer Collection",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800",
      description: "Light and breezy styles for the summer season",
      link: "/products?collection=summer",
    },
    {
      id: 2,
      name: "Autumn Essentials",
      image:
        "https://images.unsplash.com/photo-1511401139252-f158d3209c17?q=80&w=800",
      description: "Cozy and comfortable autumn must-haves",
      link: "/products?collection=autumn",
    },
    {
      id: 3,
      name: "Winter Wear",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800",
      description: "Stay warm with our winter collection",
      link: "/products?collection=winter",
    },
    {
      id: 4,
      name: "Spring Favorites",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800",
      description: "Fresh and vibrant spring styles",
      link: "/products?collection=spring",
    },
    {
      id: 5,
      name: "Workout Essentials",
      image:
        "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=800",
      description: "Performance gear for your fitness goals",
      link: "/products?collection=workout",
    },
    {
      id: 6,
      name: "Office Wear",
      image:
        "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800",
      description: "Professional attire for the workplace",
      link: "/products?collection=office",
    },
  ];

  // New arrivals data with more items
  const newArrivals = [
    {
      id: 1,
      title: "Designer Sunglasses",
      price: 159.99,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800",
      link: "/products/1",
    },
    {
      id: 2,
      title: "Minimalist Watch",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800",
      link: "/products/2",
    },
    {
      id: 3,
      title: "Leather Boots",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800",
      link: "/products/3",
    },
    {
      id: 4,
      title: "Crossbody Bag",
      price: 179.99,
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800",
      link: "/products/4",
    },
    {
      id: 5,
      title: "Wireless Earbuds",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800",
      link: "/products/5",
    },
    {
      id: 6,
      title: "Smart Speaker",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=800",
      link: "/products/6",
    },
    {
      id: 7,
      title: "Fitness Tracker",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?q=80&w=800",
      link: "/products/7",
    },
    {
      id: 8,
      title: "Designer Wallet",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800",
      link: "/products/8",
    },
  ];

  return (
    <main className="bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Shop the latest trends and innovative products from top brands
              around the world.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-black bg-white rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Electronics", "Fashion", "Home & Living", "Sports"].map(
              (category) => (
                <Link
                  key={category}
                  href={`/products?category=${category}`}
                  className="group relative h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xl font-medium">
                      {category}
                    </span>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Collections Slider with Swiper */}
      <CollectionSection collections={collections} />

      {/* Featured Products */}
      <section className="py-40 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition">
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-medium mb-2">{product.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">
                        ${product.price}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Slider */}
      <NewArrivals newArrivals={newArrivals} />

      {/* Call to Action */}
      <section className="py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover our amazing
            collection of products.
          </p>
          <Link
            href="/products"
            className="bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-md font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition"
          >
            Browse All Products
          </Link>
        </div>
      </section>
    </main>
  );
}
