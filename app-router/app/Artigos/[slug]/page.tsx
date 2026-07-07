import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtigo, getArtigos } from "@/app/lib/artigos";

export const dynamic = "force-static";
export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const artigos = await getArtigos();

  return artigos.map((artigo) => ({
    slug: artigo.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigo(slug);

  if (!artigo) {
    return {
      title: "Artigo não encontrado",
      description: "O artigo solicitado não foi encontrado.",
    };
  }

  return {
    title: artigo.titulo,
    description: artigo.descricao,
  };
}

export default async function Artigo({ params }: PageProps) {
  const { slug } = await params;
  const artigo = await getArtigo(slug);

  if (!artigo) {
    notFound();
  }

  return (
    <main style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{artigo.titulo}</h1>

      <p>
        <strong>Autor:</strong> {artigo.autor}
      </p>

      <p>
        <strong>Publicado:</strong> {artigo.data}
      </p>

      <hr />

      <p style={{ whiteSpace: "pre-line" }}>{artigo.conteudo}</p>
    </main>
  );
}
