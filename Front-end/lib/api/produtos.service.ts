// Caminho completo para este arquivo: HORTI--ei-main/lib/api/produtos.service.ts
import api from './axios'; // Importa a instância do axios configurada

export interface CreateProdutoPayload {
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock?: number;
  unit?: string;
}


export interface UpdateProdutoPayload {
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  stock?: number;
  unit?: string;
  status?: 'active' | 'deleted' | 'low_stock'; // Inclua o status para atualização
}

export interface Produto { // Interface para o objeto Produto completo retornado pelo backend
  id: number;
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock?: number;
  unit?: string;
  status: 'active' | 'deleted' | 'low_stock';
  image?: string;
}

const produtosService = {
  getAll: async (): Promise<Produto[]> => {
    const response = await api.get<Produto[]>('/produtos');
    return response.data;
  },

  getById: async (id: number): Promise<Produto> => {
    const response = await api.get<Produto>(`/produtos/${id}`);
    return response.data;
  },

  create: async (payload: CreateProdutoPayload): Promise<Produto> => {
    const response = await api.post<Produto>('/produtos', payload);
    return response.data;
  },

  update: async (id: number, payload: UpdateProdutoPayload): Promise<Produto> => {
    const response = await api.patch<Produto>(`/produtos/${id}`, payload);
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/produtos/${id}`);
  },
};

export default produtosService;