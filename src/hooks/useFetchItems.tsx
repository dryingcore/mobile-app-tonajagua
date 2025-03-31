import { useState, useEffect, useCallback } from "react";

interface TipoEstabelecimento {
  id: number;
  nome: string;
}

interface Item {
  id: number;
  nome: string;
  endereco: string;
  tipo_estabelecimento: TipoEstabelecimento;
}

type ItemsByCategory = { [categoria: string]: Item[] };

const BASE_URL = "https://s01.decodesoftware.tech/estabelecimentos";
const FETCH_CATEGORIES = [
  "Restaurante",
  "Mercado",
  "Oficina",
  "Serviços",
  "Hotel",
];

/**
 * Hook para buscar os estabelecimentos, divididos por categorias.
 * Carrega os dados da API e armazena no estado local.
 * Se o item da categoria n o existir no localStorage, busca na API e armazena.
 * Retorna um objeto com o estado de carregamento, erro e os dados.
 * @returns {object} - { items: ItemsByCategory, loading: boolean, error: string | null, refetch: () => void }
 */
const useFetchItems = () => {
  const [items, setItems] = useState<ItemsByCategory>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função auxiliar para buscar os itens de uma categoria
  const fetchCategoryItems = async (categoria: string): Promise<Item[]> => {
    const url = `${BASE_URL}?categoria=${encodeURIComponent(categoria)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Falha ao buscar dados para a categoria ${categoria}`);
    }
    const responseData = await response.json();
    return responseData.data;
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const cachedData: ItemsByCategory = {};

      for (const categoria of FETCH_CATEGORIES) {
        const armazenado = localStorage.getItem(`items_${categoria}`);
        cachedData[categoria] = armazenado ? JSON.parse(armazenado) : [];
      }

      setItems(cachedData);

      await Promise.all(
        FETCH_CATEGORIES.map(async (categoria) => {
          if (cachedData[categoria].length === 0) {
            const dados = await fetchCategoryItems(categoria);
            cachedData[categoria] = dados;
            localStorage.setItem(`items_${categoria}`, JSON.stringify(dados));
          }
        })
      );

      const todosItems = FETCH_CATEGORIES.reduce<Item[]>(
        (acumulador, categoria) => acumulador.concat(cachedData[categoria]),
        []
      );

      const updatedData: ItemsByCategory = {
        ...cachedData,
        Todos: todosItems,
      };

      setItems(updatedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { items, loading, error, refetch: fetchData };
};

export default useFetchItems;
