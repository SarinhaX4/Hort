// Caminho completo: HORTI--ei-main/lib/api/pedidos.service.ts
import api from './axios'; // Importa a instância do axios configurada

// Define as interfaces para os dados que você espera enviar e receber.
// Elas devem corresponder aos seus DTOs e entidade no NestJS.
export interface CreatePedidoPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  total: number;
}

export interface UpdatePedidoStatusPayload {
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
}

export interface Pedido { // Interface para o objeto Pedido completo retornado pelo backend
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  total: number;
  // Adicione outros campos se sua entidade Pedido no NestJS tiver
  // Por exemplo: created_at: string;
}

const pedidosService = {
  getAll: async (): Promise<Pedido[]> => {
    const response = await api.get<Pedido[]>('/pedido');
    return response.data;
  },

  getById: async (id: number): Promise<Pedido> => {
    const response = await api.get<Pedido>(`/pedido/${id}`);
    return response.data;
  },

  create: async (payload: CreatePedidoPayload): Promise<Pedido> => {
    const response = await api.post<Pedido>('/pedido', payload);
    return response.data;
  },

  updateStatus: async (id: number, payload: UpdatePedidoStatusPayload): Promise<Pedido> => {
    const response = await api.patch<Pedido>(`/pedido/${id}`, payload);
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/pedido/${id}`);
  },
};

export default pedidosService;