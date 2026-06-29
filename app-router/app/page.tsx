import Link from "next/link";
import { getArtigos } from "@/app/lib/artigos";

export const dynamic = "force-static";

export default async function Home() {
  const artigos = await getArtigos();

  return (
    <main>
      <h1>Meu Blog</h1>

      {artigos.map((artigo) => (
        <article key={artigo.id} className="article-card">
          <h2>{artigo.titulo}</h2>

          <p>
            {artigo.autor} - {artigo.data}
          </p>

          <Link href={`/artigos/${artigo.slug}`}>Ler artigo</Link>
        </article>
      ))}
    </main>
  );
}
