import Link from "next/link";
import { notFound } from "next/navigation";
import articlesData from "../../data/artigos.json";

export async function generateStaticParams() {
  return articlesData.map((artigo) => ({
    slug: artigo.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artigo = articlesData.find((artigo) => artigo.slug === slug);

  if (!artigo) {
    return {
      title: "Artigo não encontrado",
      description: "O artigo que você está procurando não foi encontrado.",
    };
  }

  return {
    title: artigo.titulo,
    description: artigo.conteudo.substring(0, 160) + "...",
    type: "article",
    publishedTime: artigo.dataPublicacao,
    authors: [artigo.autor],
  };
}

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artigo = articlesData.find((artigo) => artigo.slug === slug);

  if (!artigo) {
    notFound();
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="article-page">
      <article className="article-reading">
        <Link href="/" className="back-link">
          <span aria-hidden="true">←</span>
          Voltar para artigos
        </Link>

        <header className="article-hero">
          <p className="eyebrow">Artigo</p>
          <h1>{artigo.titulo}</h1>
          <p>
            Por {artigo.autor} em {formatarData(artigo.dataPublicacao)}
          </p>
        </header>

        <div className="article-body">
          {artigo.conteudo.split("\n").map((paragrafo, index) => (
            <p key={index}>{paragrafo}</p>
          ))}
        </div>
      </article>
    </main>
  );
}