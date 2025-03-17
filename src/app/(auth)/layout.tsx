import AuthNav from "@/components/composed/navigation/AuthNav";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AuthNav />
      <section className="min-h-[calc(100vh_-_64px)] flex flex-col">
        {children}
      </section>
    </section>
  );
}
