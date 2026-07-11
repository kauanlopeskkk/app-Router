import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu Blog Next.js",
  description: "Artigos sobre desenvolvimento web, Next.js e boas práticas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <nav className="bg-white shadow-sm p-4 mb-8">
          <div className="container mx-auto">
            <a href="/" className="text-xl font-bold text-blue-600">Meu Blog</a>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-800 text-white text-center p-6 mt-12">
          <p>&copy; 2026 Meu Blog. Desenvolvido com Next.js 15.</p>
        </footer>
      </body>
    </html>
  );
}