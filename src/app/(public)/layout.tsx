import { PublicNavbar } from "@/src/components/layout/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      <main className="pt-16">{children}</main>
    </>
  );
} 