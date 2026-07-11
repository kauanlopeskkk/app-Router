// lib/api.ts

// Substitua pelo seu App ID real ou use uma variável de ambiente
const APP_ID = process.env.NEXT_PUBLIC_CRUDCRUD_ID || 'SEU_APP_ID_AQUI'; 
const BASE_URL = `https://crudcrud.com/api/${APP_ID}`;
const RESOURCE_NAME = 'artigos'; // Nome da sua coleção (deve ser plural e minúsculo)

export interface Artigos {
  _id?: string; // O CrudCrud usa _id para identificar registros
  id?: string;  // Se preferir usar seu próprio ID lógico
  titulo: string;
  autor: string;
  dataPublicacao: string;
  conteudo: string;
  slug: string;
}

// Função para buscar todos os artigos (GET)
export async function getArtigos(): Promise<Artigos[]> {
  try {
    const res = await fetch(`${BASE_URL}/${RESOURCE_NAME}`, {
      next: { revalidate: 60 } // SSR: Revalida a cada 60 segundos (Cache)
    });
    if (!res.ok) throw new Error('Falha ao buscar artigos');
    return await res.json();
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return [];
  }
}

// Função para buscar um artigo por ID (GET)
export async function getArtigoPorId(id: string): Promise<Artigos | null> {
  try {
    const res = await fetch(`${BASE_URL}/${RESOURCE_NAME}/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Erro ao buscar artigo:', error);
    return null;
  }
}

// Função auxiliar para gerar slug (se a API não retornar)
export function gerarSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}