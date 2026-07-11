import {notFound} from "next/navigation";
import articlesData from "../../data/artigos.json";

interface Artigo {
  id: string;
  titulo: string;
  autor: string;
  dataPublicacao: string;
  conteudo: string;
  slug: string;
}

export async function generateStaticParams() {
  return articlesData.map((artigo) => ({
    slug: artigo.slug,
  }));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
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

export default async function ArtigoPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const artigo = articlesData.find((artigo) => artigo.slug === slug);

  if (!artigo) {
    notFound();
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="container mx-auto p-4 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{artigo.titulo}</h1>
        <p className="text-gray-600">
          Por {artigo.autor} em {formatarData(artigo.dataPublicacao)}
        </p>
      </header>

      <div className="prose prose-lg max-w-3xl text-gray-800 leading-relaxed whitespace-pre-wrap">
        {artigo.conteudo.split('\n').map((paragrafo, index) => (
          <p key={index}>{paragrafo}</p>
        ))}
      </div>

      <footer className="mt-8 border-t border-gray-300 pt-4">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Meu Blog. Todos os direitos reservados.
        </p>
      </footer>
    </article>
  );
}

