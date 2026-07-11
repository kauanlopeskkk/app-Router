import Link from 'next/link';
import articlesData from './data/artigos.json';

// Formato da data para exibição
const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Últimos Artigos</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {articlesData.map((artigo) => (
          <article key={artigo.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/artigos/${artigo.slug}`} className="text-blue-600 hover:underline">
                {artigo.titulo}
              </Link>
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Por {artigo.autor} em {formatarData(artigo.dataPublicacao)}
            </p>
            <p className="text-gray-700 line-clamp-3">
              {artigo.conteudo}
            </p>
            <Link 
              href={`/artigos/${artigo.slug}`} 
              className="inline-block mt-4 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Ler mais &rarr;
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}