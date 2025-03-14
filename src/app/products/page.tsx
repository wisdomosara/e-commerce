import { ProductCard } from "@/components/composed/productsPage/ProductCard";
import { IProduct } from "@/interfaces/IProduct.interface";
import React from "react";

const ProductPage = async () => {
  let products: IProduct[] = [];

  try {
    const response = await fetch("https://dummyjson.com/products", {
      cache: "no-store",
    });
    const data = await response.json();
    products = data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <section className="w-full mt-[40px] py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
