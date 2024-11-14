import { Inter } from "next/font/google";
import { ThemeProvider } from "@/src/components/providers/ThemeProvider";
import "./globals.css";
import { PublicNavbar } from "../components/layout/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AniHub",
  description: "Your anime and manga hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <PublicNavbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
