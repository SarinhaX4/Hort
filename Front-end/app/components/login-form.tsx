// Caminho completo: HORTI--ei-main/app/components/login-form.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirecionar após login
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

// Importações para React Hook Form e Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'; // Importa Zod para validação

// Importar os componentes de formulário do shadcn/ui (ajuste o caminho conforme necessário)
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from '@/components/ui/form'; // Ajuste o caminho conforme a localização real do arquivo 'form.tsx'


// Importar o serviço de autenticação
import authService from '@/lib/api/auth.service';

// --- SCHEMA DE VALIDAÇÃO COM ZOD ---
// Define o esquema de validação para os campos do formulário de login
const formSchema = z.object({
  username: z.string().min(3, {
    message: 'O nome de usuário deve ter pelo menos 3 caracteres.',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter pelo menos 6 caracteres.',
  }),
});

// --- COMPONENTE LoginForm ---
export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 1. Defina seu formulário usando useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Conecta o Zod ao React Hook Form
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // 2. Defina o que fazer quando o formulário for submetido
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSubmitError(null); // Limpa erros anteriores
    try {
      const response = await authService.login(values);
      alert('Login bem-sucedido! Bem-vindo(a), ' + values.username + '!');
      // Redireciona para a página principal após o login
      router.push('/');
    } catch (err: any) {
      console.error('Erro no login:', err);
      // Extrai a mensagem de erro da resposta da API, se disponível
      setSubmitError(err.response?.data?.message || 'Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-[350px] mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">Login Hort+</CardTitle>
      </CardHeader>
      <CardContent>
        {/* O componente Form encapsula o formulário e gerencia o handleSubmit */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Campo de Usuário */}
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input
                  placeholder="Seu nome de usuário"
                  {...form.register('username')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Campo de Senha */}
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Sua senha"
                  {...form.register('password')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Exibe erros de submissão da API (não de validação de campo) */}
            {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Carregando...' : 'Entrar'}
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Não tem uma conta? <a href="/register" className="text-blue-500 hover:underline">Registre-se</a>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}