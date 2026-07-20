import Link from "next/link";
import articlesData from "./data/artigos.json";

const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">Blog de desenvolvimento web</p>
          <h1>Artigos sobre Next.js, App Router e boas práticas</h1>
          <p className="hero-text">
            Conteúdos diretos para aprender rotas dinâmicas, SEO, performance e
            construção de aplicações modernas com uma experiência mais elegante.
          </p>
        </div>
      </section>

      <section className="articles-section" aria-labelledby="articles-title">
        <div className="section-heading">
          <p className="eyebrow">Leituras recentes</p>
          <h2 id="articles-title">Últimos artigos</h2>
        </div>

        <div className="articles-grid">
          {articlesData.map((artigo) => (
            <article key={artigo.id} className="article-card">
              <div className="article-card-top">
                <span className="article-tag">Next.js</span>
                <time dateTime={artigo.dataPublicacao}>
                  {formatarData(artigo.dataPublicacao)}
                </time>
              </div>

              <h3>
                <Link href={`/artigos/${artigo.slug}`}>{artigo.titulo}</Link>
              </h3>

              <p className="article-author">Por {artigo.autor}</p>
              <p className="article-description">{artigo.conteudo}</p>

              <Link className="read-link" href={`/artigos/${artigo.slug}`}>
                Ler artigo
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}