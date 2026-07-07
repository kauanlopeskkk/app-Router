import Link from "next/link";
import { getArtigos } from "@/app/lib/artigos";

export const dynamic = "force-static";

export default async function Home() {
  const artigos = await getArtigos();

  return (
    <main style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Meu Blog</h1>

      {artigos.map((artigo) => (
        <article key={artigo.id} style={{ marginBottom: "24px" }}>
          <h2>{artigo.titulo}</h2>

          <p>
            <strong>{artigo.autor}</strong> - {artigo.data}
          </p>

          <p>{artigo.descricao}</p>

          <Link href={`/artigos/${artigo.slug}`}>Ler artigo</Link>
        </article>
      ))}
    </main>
  );
}
