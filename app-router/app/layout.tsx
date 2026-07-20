import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
      <body className={inter.className}>
        <div className="site-shell">
          <header className="site-header">
            <nav className="nav-bar" aria-label="Principal">
              <Link href="/" className="brand">
                <span className="brand-mark">N</span>
                <span>Next Blog</span>
              </Link>
              <Link href="/" className="nav-link">
                Artigos
              </Link>
            </nav>
          </header>

          {children}

          <footer className="site-footer">
            <p>&copy; 2026 Next Blog. Desenvolvido com Next.js.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}