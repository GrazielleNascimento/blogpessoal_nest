import { PostagemModule } from './postagem/postagem.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; //Importamos o pacote TypeORMModule, que foi instalado anteriormente
import { Postagem } from './postagem/entities/postagem.entity';
import { TemaModule } from './tema/tema.module';
import { Tema } from './tema/entities/tema.entity';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({//metodo forRoot() configura a conexão com o banco de dados
      type: 'mysql', // A propriedade type define o tipo do Banco de dados (MySQL)
      host: 'localhost',// define o endereço do servidor onde Banco de dados está hospedado
      port: 3306, //3306 - Porta padrão do MySQL
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal_nest', //A propriedade database define o nome do Banco de dados que foi criado no MySQL
      entities: [Postagem, Tema, Usuario],// add classe Postagem para criar a tabela(entity) no banco de dados
      //A propriedade synchronize definida com true indica que as tabelas do Banco de dados serão criadas/atualizadas automaticamente em cada inicialização da aplicação.
      synchronize: true,
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})  
export class AppModule {}
