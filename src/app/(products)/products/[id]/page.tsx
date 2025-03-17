import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetailsPage from "@/components/composed/productsPage/ProductDetailsPage";

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) throw new Error("Failed to fetch product");

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsPage product={product} />;
}
