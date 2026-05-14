import { Header } from "@/components/common/header";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </>
  );
}
