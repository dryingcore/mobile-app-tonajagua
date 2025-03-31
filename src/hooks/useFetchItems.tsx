import { useState, useEffect, useCallback } from "react";

interface Item {
  id: number;
  nome: string;
  endereco: string;
  tipo_estabelecimento: {
    id: number;
    nome: string;
  };
}

const useFetchItems = (categoria: string) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const cachedData = localStorage.getItem(`items_${categoria}`);

      if (cachedData) {
        setItems(JSON.parse(cachedData));
        setLoading(false);
      } else {
        const url = `https://s01.decodesoftware.tech/estabelecimentos?categoria=${encodeURIComponent(
          categoria
        )}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");

        const responseData = await response.json();
        setItems(responseData.data);

        localStorage.setItem(
          `items_${categoria}`,
          JSON.stringify(responseData.data)
        );
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setLoading(false);
    }
  }, [categoria]);

  useEffect(() => {
    fetchData();
  }, [categoria, fetchData]);

  return { items, loading, error, fetchData };
};

export default useFetchItems;
