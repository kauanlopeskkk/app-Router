import "./globals.css";


export const metadata = {
  title: "Meu Blog",
  description: "Blog criado com Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}



