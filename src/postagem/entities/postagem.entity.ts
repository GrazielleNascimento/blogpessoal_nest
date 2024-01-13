import { IsNotEmpty } from 'class-validator'; //decorators para as validaçoes
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm'; // Importamos o pacote TypeORM com os respectivos decorators

@Entity({ name: 'tb_postagens' }) //gera a tabela
export class Postagem {
  @PrimaryGeneratedColumn() //pk auto-increment 1
  id: number;

  @IsNotEmpty() //@IsNotEmpty faz parte do pacote Validation e define que o valor do Atributo não pode ser vazio, ou seja, precisa ser enviado algum valor.
  @Column({ length: 100, nullable: false }) //O decorator @Column define que o atributo será inserido na estrutura da Tabela, ou seja, se você não declarar o decorator @Column (exceto nos atributos Chave Primária e Timestamp), o atributo não será inserido na estrutura da tabela.
  titulo: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false }) //length Define o tamanho do atributo string no Banco de dados. nullable	Define se o atributo pode ser nulo (null).false = Não pode ser nulo
  texto: string;

  @UpdateDateColumn() //O decorator @UpdateDateColumn configura o atributo data como Timestamp, ou seja, o Nest se encarregará de obter a data e a hora do Sistema Operacional e inserir no atributo data toda vez que um Objeto da Classe Postagem for criado ou atualizado.
  data: Date;
}
