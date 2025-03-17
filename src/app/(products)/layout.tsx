"use client";

import Footer from "@/components/composed/navigation/Footer";
import Navbar from "@/components/composed/navigation/Navbar";
import { usePathname } from "next/navigation";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isIndex = pathname === "/";

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <section className={`grow ${!isIndex ? 'mt-[50px]' : ''}`}>
        {children}
      </section>
      <Footer />
    </section>
  );
}
