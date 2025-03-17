export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="h-12 w-48 mb-12 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <div className="aspect-square relative bg-neutral-200 dark:bg-neutral-800 animate-pulse">
              <div className="absolute bottom-4 left-4 h-8 w-32 bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
