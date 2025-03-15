import { ProductsPageComponent } from "@/components/composed/productsPage/ProductsPage";
import { IProduct } from "@/interfaces/IProduct.interface";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParamsObj = await searchParams;
  const pageNumber = parseInt(searchParamsObj.page || "1", 10);

  const limit = 30;
  let products: IProduct[] = [];
  let total = 0;

  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${
        (pageNumber - 1) * limit
      }`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    products = data.products;
    total = data.total;
  } catch (error) {
    console.error("Error fetching initial products:", error);
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <section className="w-full mt-[40px] py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold text-stone-900 dark:text-stone-100 sm:text-3xl">
          Featured Products
        </h2>
        <ProductsPageComponent
          initialProducts={products}
          currentPage={pageNumber}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
}
