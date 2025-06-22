import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { DevelopersModule } from './developers/developers.module';
import { ProdutosModule } from './produtos/produtos.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [ProdutosModule, UsuarioModule, CarrinhoModule, PedidoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
