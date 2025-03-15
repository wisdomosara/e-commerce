import React from "react";

const Loading = () => {
  return (
    <section className="w-full mt-[40px] py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-3xl animate-pulse">
          <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-md bg-neutral-50 dark:bg-neutral-900 shadow-sm animate-pulse"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 sm:h-64">
                <div className="h-full w-full bg-neutral-200 dark:bg-neutral-700"></div>
              </div>

              <div className="p-4">
                <div className="mb-1 flex items-center justify-between">
                  <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                  <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                </div>

                <div className="mb-1 h-5 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>

                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <div className="h-6 w-24 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                    <div className="mt-1 h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                  </div>
                  <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loading;
