import { Module } from '@nestjs/common';
import { Postagem } from './entities/postagem.entity'; //Importamos a Classe Postagem, criada anteriormente,  foi utilizado o caminho relativo (./entities/postagem.entity.ts)
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemService } from './services/postagem.service';
import { PostagemController } from './controllers/postagem.controller';
import { TemaService } from '../tema/services/tema.service';
import { TemaModule } from '../tema/tema.module';

// decorator @Module indica que esta classe será a Classe principal do Módulo, ou seja, nela registraremos todas as Classes (Entidade, Service e Controller) criadas dentro do Módulo.
@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],//: No array imports vamos importar todas as Classes Entidade (Model) do Módulo, através do Método forFeature, da Classe TypeOrmModule. Observe que importamos a Classe Entidade Postagem.
    providers:[PostagemService, TemaService],//importacao das classes de Serviço do Modulo
    controllers: [PostagemController], //importacao das classes Controladoradoras do Modulo
    exports: [TypeOrmModule]// adiciona classes que precisam estar disponiveis p outros Módulos
//No array exports vamos importar todas as Classes do Módulo que precisam estar disponíveis para outros Módulos. Como teremos que registrar a Classe Postagem no Módulo principal da aplicação (AppModule), vamos inserir no array a Classe do TypeORM utilizada para registrar a Classe Postagem (TypeOrmModule).
})
export class PostagemModule {}//exporta a classe PostagemModulo para ser usada no modulo principal AppModule