// Caminho completo: HORTI--ei-main/app/components/product-management.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Package } from 'lucide-react';

// Importa o novo serviço de produtos
import produtosService, { Produto, CreateProdutoPayload, UpdateProdutoPayload } from '@/lib/api/produtos.service';

export function ProductManagement() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
  const [formProduct, setFormProduct] = useState<CreateProdutoPayload | UpdateProdutoPayload>({
    name: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    unit: 'kg',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar produtos do back-end
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await produtosService.getAll();
      setProducts(data);
    } catch (err: any) {
      console.error('Erro ao buscar produtos:', err);
      setError(`Erro ao carregar produtos: ${err.message || 'Erro desconhecido'}. Verifique o console do navegador e o terminal do NestJS.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddOrUpdateProduct = async () => {
    try {
      if (editingProduct) {
        await produtosService.update(editingProduct.id, formProduct);
        alert('Produto atualizado com sucesso!');
      } else {
        await produtosService.create(formProduct as CreateProdutoPayload);
        alert('Produto cadastrado com sucesso!');
      }
      fetchProducts();
      setIsAddDialogOpen(false);
      setEditingProduct(null);
      setFormProduct({ name: '', description: '', category: '', price: 0, stock: 0, unit: 'kg' });
    } catch (err: any) {
      console.error('Erro ao salvar produto:', err);
      alert(`Erro ao salvar produto: ${err.message || 'Erro desconhecido'}.`);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover este produto?')) {
      try {
        await produtosService.remove(id);
        alert('Produto removido (status alterado para deleted) com sucesso!');
        fetchProducts();
      } catch (err: any) {
        console.error('Erro ao remover produto:', err);
        alert(`Erro ao remover produto: ${err.message || 'Erro desconhecido'}.`);
      }
    }
  };

  const handleEditClick = (product: Produto) => {
    setEditingProduct(product);
    setFormProduct(product);
    setIsAddDialogOpen(true);
  };

  const getStatusBadge = (status: Produto['status'], stock: number) => {
    if (status === 'deleted') {
      return <Badge variant="destructive">Removido</Badge>;
    }
    if (stock <= 10) {
      return <Badge variant="destructive">Estoque Baixo</Badge>;
    }
    return <Badge variant="default">Ativo</Badge>;
  };

  const activeProducts = products.filter((p) => p.status !== 'deleted');

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Produtos</h2>
          <p className="text-gray-600">Cadastre e gerencie os produtos do seu catálogo</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) {
            setEditingProduct(null);
            setFormProduct({ name: '', description: '', category: '', price: 0, stock: 0, unit: 'kg' });
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
              <DialogDescription>
                {editingProduct ? 'Altere os detalhes do produto.' : 'Cadastre um novo produto no catálogo.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input
                  id="name"
                  value={formProduct.name}
                  onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                  placeholder="Ex: Maçã Gala Orgânica"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formProduct.description || ''}
                  onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
                  placeholder="Descrição detalhada do produto"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={formProduct.category || ''}
                    onChange={(e) => setFormProduct({ ...formProduct, category: e.target.value })}
                    placeholder="Ex: Frutas"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unidade</Label>
                  <Input
                    id="unit"
                    value={formProduct.unit || ''}
                    onChange={(e) => setFormProduct({ ...formProduct, unit: e.target.value })}
                    placeholder="kg, unidade, bandeja"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formProduct.price}
                    onChange={(e) => setFormProduct({ ...formProduct, price: Number(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Estoque</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formProduct.stock}
                    onChange={(e) => setFormProduct({ ...formProduct, stock: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddOrUpdateProduct}>
                  {editingProduct ? 'Salvar Alterações' : 'Cadastrar Produto'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Produtos Cadastrados ({activeProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Carregando produtos do back-end...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && activeProducts.length === 0 && (
            <p>Nenhum produto encontrado. Clique em "Adicionar Produto" para cadastrar um.</p>
          )}

          {!loading && !error && activeProducts.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{product.stock}</span>
                        <span className="text-sm text-gray-500">{product.unit}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status, product.stock ?? 0)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
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