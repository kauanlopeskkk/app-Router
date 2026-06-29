import artigos from "@/app/data/artigo.json";

const APIURL = "https://crudcrud.com/api/f4ba693d2451492d8b5870c5d99efb93";

export type Artigo = {
  id: number;
  titulo: string;
  autor: string;
  data: string;
  descricao: string;
  conteudo: string;
  slug: string;
};

type RawArtigo = Omit<Artigo, "descricao"> & {
  descrição: string;
};

function normalizeArtigo(raw: RawArtigo): Artigo {
  const { descrição, ...rest } = raw;
  return {
    ...rest,
    descricao: descrição,
  };
}

export async function getArtigos(): Promise<Artigo[]> {
  return (artigos as RawArtigo[]).map(normalizeArtigo);
}

export async function getArtigo(slug: string): Promise<Artigo | undefined> {
  return (await getArtigos()).find((artigo) => artigo.slug === slug);
}
