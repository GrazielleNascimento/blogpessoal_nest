import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity({ name: 'tb_temas' })
export class Tema {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty() //@IsNotEmpty faz parte do pacote Validation e define que o valor do Atributo não pode ser vazio, ou seja, precisa ser enviado algum valor.
  @Column({ length: 255, nullable: false }) //O decorator @Column define que o atributo será inserido na estrutura da Tabela, ou seja, se você não declarar o decorator @Column (exceto nos atributos Chave Primária e Timestamp), o atributo não será inserido na estrutura da tabela.
  descricao: string;

  //RELACIONAMENTO
  //O decorator @OneToMany indica que a Classe Tema será o lado 1:N
  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  postagem: Postagem[];
}
