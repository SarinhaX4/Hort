// HORTI--ei-main/app/components/order-management.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShoppingCart, Eye, Clock, Truck, CheckCircle } from 'lucide-react';

// Importa o serviço de pedidos que acabamos de criar
import pedidosService, { Pedido, CreatePedidoPayload, UpdatePedidoStatusPayload } from '@/lib/api/pedidos.service';

interface StatusOption {
  value: Pedido['status'];
  label: string;
  icon: React.ElementType;
}

const statusOptions: StatusOption[] = [
  { value: 'PENDING', label: 'Pendente', icon: Clock },
  { value: 'CONFIRMED', label: 'Confirmado', icon: CheckCircle },
  { value: 'PREPARING', label: 'Preparando', icon: ShoppingCart },
  { value: 'OUT_FOR_DELIVERY', label: 'Saiu para Entrega', icon: Truck },
  { value: 'DELIVERED', label: 'Entregue', icon: CheckCircle },
];

export function OrderManagement() {
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      // Usa o serviço de pedidos para buscar todos
      const data = await pedidosService.getAll();
      setOrders(data);
    } catch (err: any) {
      console.error('Erro ao buscar pedidos:', err);
      setError(`Erro ao carregar pedidos: ${err.message || 'Erro desconhecido'}. Verifique o console do navegador e o terminal do NestJS.`);
      setOrders([]); // Garante que a lista esteja vazia em caso de erro
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); // Busca pedidos ao montar o componente
  }, []);

  const getStatusColor = (status: Pedido['status']) => {
    const colors: Record<Pedido['status'], string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      PREPARING: 'bg-orange-100 text-orange-800',
      OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: Pedido['status']) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option ? option.label : status;
  };

  const handleStatusUpdate = async (orderId: number, newStatus: Pedido['status']) => {
    try {
      const payload: UpdatePedidoStatusPayload = { status: newStatus };
      await pedidosService.updateStatus(orderId, payload);
      alert(`Status do pedido ${orderId} atualizado para ${getStatusText(newStatus)} com sucesso!`);
      fetchOrders(); // Recarrega a lista para mostrar a atualização
    } catch (err: any) {
      console.error('Erro ao atualizar status do pedido:', err);
      alert(`Erro ao atualizar status do pedido ${orderId}: ${err.message || 'Erro desconhecido'}.`);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const newOrder: CreatePedidoPayload = {
        customerName: 'Novo Cliente Demo',
        customerEmail: 'demo@example.com',
        customerPhone: '(99) 99999-9999',
        deliveryAddress: 'Rua da Amostra, 456',
        total: 55.99,
      };
      const createdOrder = await pedidosService.create(newOrder);
      alert(`Pedido ${createdOrder.id} criado com sucesso!`);
      fetchOrders(); // Recarrega a lista para mostrar o novo pedido
    } catch (err: any) {
      console.error('Erro ao criar pedido:', err);
      alert(`Erro ao criar pedido: ${err.message || 'Erro desconhecido'}.`);
    }
  };

  const filteredOrders =
    statusFilter === 'all' ? orders : orders.filter((order) => order.status === statusFilter);

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Pedidos Hort+</h2>
          <p className="text-gray-600">Acompanhe e gerencie todos os pedidos</p>
        </div>

        <div className="flex space-x-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleCreateOrder}>Criar Pedido (Exemplo)</Button> {/* Botão de criação */}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Pedidos ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Carregando pedidos do back-end...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && filteredOrders.length === 0 && (
            <p>Nenhum pedido encontrado. Clique em "Criar Pedido (Exemplo)" para adicionar um.</p>
          )}

          {!loading && !error && filteredOrders.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Endereço de Entrega</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                    </TableCell>
                    <TableCell>R$ {order.total ? order.total.toFixed(2) : '0.00'}</TableCell>
                    <TableCell>{order.deliveryAddress}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detalhes do Pedido {selectedOrder?.id}</DialogTitle>
                              <DialogDescription>Informações completas do pedido</DialogDescription>
                            </DialogHeader>

                            {selectedOrder && (
                              <div className="space-y-6">
                                {/* Informações do Cliente */}
                                <div>
                                  <h3 className="font-semibold mb-2">Cliente</h3>
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <p>
                                      <strong>Nome:</strong> {selectedOrder.customerName}
                                    </p>
                                    <p>
                                      <strong>Email:</strong> {selectedOrder.customerEmail}
                                    </p>
                                    <p>
                                      <strong>Telefone:</strong> {selectedOrder.customerPhone}
                                    </p>
                                    <p>
                                      <strong>Endereço:</strong> {selectedOrder.deliveryAddress}
                                    </p>
                                  </div>
                                </div>

                                {/* Atualizar Status */}
                                <div>
                                  <h3 className="font-semibold mb-2">Atualizar Status</h3>
                                  <div className="flex space-x-2">
                                    {statusOptions.map((option) => {
                                      const Icon = option.icon;
                                      return (
                                        <Button
                                          key={option.value}
                                          variant={selectedOrder.status === option.value ? 'default' : 'outline'}
                                          size="sm"
                                          onClick={() => handleStatusUpdate(selectedOrder.id, option.value)}
                                        >
                                          <Icon className="mr-2 h-4 w-4" />
                                          {option.label}
                                        </Button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}