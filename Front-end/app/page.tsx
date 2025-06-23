// Caminho completo: HORTI--ei-main/app/page.tsx
import { ProductManagement } from './components/product-management'; // Importação corrigida
import { OrderManagement } from './components/order-management'; // Importação do OrderManagement

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* Você pode manter ou remover o conteúdo existente se quiser */}
        {/* Por exemplo, o logo do Next.js ou links */}
      </div>

      {/* Renderize os componentes ProductManagement e OrderManagement aqui */}
      <ProductManagement />
      <div style={{ height: '50px' }}></div> {/* Espaço entre os componentes */}
      <OrderManagement />


      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {/* Outro conteúdo existente da página, se houver */}
      </div>
    </main>
  );
}