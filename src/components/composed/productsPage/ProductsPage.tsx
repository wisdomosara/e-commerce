import { ProductCard } from "@/components/composed/productsPage/ProductCard";
import { IProduct } from "@/interfaces/IProduct.interface";

interface Props {
  initialProducts: IProduct[];
  currentPage: number;
  totalPages: number;
}

export const ProductsPageComponent = ({ 
  initialProducts,
  currentPage,
  totalPages
}: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {initialProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      
      <div className="flex justify-center items-center gap-4 mt-8">
        <a
          href={currentPage > 1 ? `?page=${currentPage - 1}` : '#'}
          className={`px-4 py-2 bg-stone-600 text-white rounded-lg transition-colors ${
            currentPage <= 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:bg-stone-700'
          }`}
        >
          Previous
        </a>
        <span className="text-stone-700 dark:text-stone-300">
          Page {currentPage} of {totalPages}
        </span>
        <a
          href={currentPage < totalPages ? `?page=${currentPage + 1}` : '#'}
          className={`px-4 py-2 bg-stone-600 text-white rounded-lg transition-colors ${
            currentPage >= totalPages ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:bg-stone-700'
          }`}
        >
          Next
        </a>
      </div>
    </div>
  );
};
