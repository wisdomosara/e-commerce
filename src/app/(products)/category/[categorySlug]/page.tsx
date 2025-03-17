import { Metadata } from "next";
import { IProduct } from "@/interfaces/IProduct.interface";
import { ProductCard } from "@/components/composed/productsPage/ProductCard";

async function getProductsByCategory(categorySlug: string) {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/category/${categorySlug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const categoryName = categorySlug?.replace(/-/g, " ");

  return {
    title: `${
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    } Products`,
    description: `Browse our collection of ${categoryName} products`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug: resolvedCategorySlug } = await params;
  const products = await getProductsByCategory(resolvedCategorySlug);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 capitalize">
        {resolvedCategorySlug.replace(/-/g, " ")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products?.map((product: IProduct) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
