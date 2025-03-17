import Image from "next/image";
import Link from "next/link";

type ICategory = {
  slug: string;
  name: string;
  url: string;
};

const categoryImages: Record<string, string> = {
  beauty: "https://images.unsplash.com/photo-1580715366373-b1b36d59d6ae",
  fragrances: "https://images.unsplash.com/photo-1572569511240-7c3670c9c5c6",
  furniture: "https://images.unsplash.com/photo-1615873968401-e6a91398c3c7",
  groceries: "https://images.unsplash.com/photo-1561053517-9c3babc1fab0",
  "home-decoration":
    "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
  "kitchen-accessories":
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
  laptops: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef",
  "mens-shirts": "https://images.unsplash.com/photo-1581578731548-c64695cc6959",
  "mens-shoes": "https://images.unsplash.com/photo-1603808033192-3bab5bff31e6",
  "mens-watches":
    "https://images.unsplash.com/photo-1519817650390-64a93db51146",
  "mobile-accessories":
    "https://images.unsplash.com/photo-1517940310602-30f3b0190875",
  motorcycle: "https://images.unsplash.com/photo-1519066629447-267fffa62d3c",
  "skin-care": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  smartphones: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  "sports-accessories":
    "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  sunglasses: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae",
  tablets: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
  tops: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
  vehicle: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  "womens-bags": "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
  "womens-dresses":
    "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
  "womens-jewellery":
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
  "womens-shoes":
    "https://images.unsplash.com/photo-1596755095378-c9dc0e97f64c",
  "womens-watches": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
};

async function getCategories() {
  try {
    const res = await fetch("https://dummyjson.com/products/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data: ICategory[] = await res.json();
    // Transform the data into the required format with Unsplash images
    const formattedData = data?.map((category) => ({
      slug: category?.slug,
      name: category?.name,
      url: categoryImages[category?.slug],
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Re-throw to let Next.js error boundary handle it
  }
}

interface Category {
  slug: string;
  name: string;
  url: string;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Shop by Category</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories?.map((category: Category) => (
          <Link
            href={`/category/${category.slug}`}
            key={category.slug}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-square relative">
              <Image
                src={category?.url}
                alt={category?.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                {category?.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
