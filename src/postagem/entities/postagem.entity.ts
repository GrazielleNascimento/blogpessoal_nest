import { IsNotEmpty } from 'class-validator'; //decorators para as validaçoes
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'; // Importamos o pacote TypeORM com os respectivos decorators
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

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
  /* O decorator @ManyToOne indica que a Classe Postagem será o lado N:1 da relação
   e terá um Objeto da Classe Tema, chamado tema,
    que no modelo Relacional será
     a Chave Estrangeira na Tabela tb_postagens (temaId).*/

  //RELACIONAMENTO
  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE',
    /*cascade faz com que se excluimos um objeto Tema, todos os objetos postagem dentro daquela tema sera excluido
      onDelete: O "cascateamento" foi habilitado apenas na operação Delete, ou seja, apenas quando um Objeto da Classe Tema for apagado, todos os Objetos da Classe Postagem associados ao Tema também serão apagados. O Inverso não é verdadeiro.*/
  })
  tema: Tema;

  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: "CASCADE"
  })
  usuario: Usuario
}
