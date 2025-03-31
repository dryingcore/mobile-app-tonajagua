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

// URL base da API
const BASE_URL = "https://s01.decodesoftware.tech/estabelecimentos";
// Categorias a serem buscadas (excluímos "Todos", que será composta a partir das demais)
const FETCH_CATEGORIES = [
  "Restaurante",
  "Mercado",
  "Oficina",
  "Serviços",
  "Hotel",
];

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

      // Recupera dados do cache (localStorage) para cada categoria
      for (const categoria of FETCH_CATEGORIES) {
        const armazenado = localStorage.getItem(`items_${categoria}`);
        cachedData[categoria] = armazenado ? JSON.parse(armazenado) : [];
      }

      // Atualiza o estado com os dados em cache (otimização visual)
      setItems(cachedData);

      // Para cada categoria sem dados no cache, realiza a busca na API
      await Promise.all(
        FETCH_CATEGORIES.map(async (categoria) => {
          if (cachedData[categoria].length === 0) {
            const dados = await fetchCategoryItems(categoria);
            cachedData[categoria] = dados;
            localStorage.setItem(`items_${categoria}`, JSON.stringify(dados));
          }
        })
      );

      // Concatena os itens de todas as categorias para compor "Todos"
      const todosItems = FETCH_CATEGORIES.reduce<Item[]>(
        (acumulador, categoria) => acumulador.concat(cachedData[categoria]),
        []
      );

      // Atualiza os dados incluindo a categoria "Todos"
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
