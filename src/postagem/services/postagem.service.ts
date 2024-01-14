import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //: Importamos a Classe Repository, do Módulo typeorm, do pacote Typeorm.
import { Postagem } from '../entities/postagem.entity';
import { Repository } from 'typeorm';

//@Injectable indica que a classe é do tipo Service (Classe de Serviço)
// que pode ser Injetada em outras Classes através da Injeção de Dependências.
@Injectable()
export class PostagemService {
  // Cria um Construtor, que receberá as Injeções de Dependência
  // necessárias para o desenvolvimento da Classe de Serviço.
  // O construtor é chamado quando uma instância da classe é criada.
  constructor(
    //A Injeção de Dependências é um tipo de Inversão de Controle ( É a transferência da responsabilidade de Criar e Instanciar Objetos para a Linguagem ou Framework.)
    //injeção de dependência é um padrão de projeto no qual uma classe solicita dependências de fontes externas ao invés de criá-las.
    @InjectRepository(Postagem) // usado para informar ao TypeORM que a dependência que será injetada no construtor é do tipo Postagem.
    private postagemRepository: Repository<Postagem>,
  ) {}

  //Criamos o Método Assíncrono (async), chamado findAll(), que promete retornar uma Promise contendo um array de Objetos da Classe Postagem.
  //Como o Método findAll() lista vários Objetos é necessário criar um array para armazenar todos os Objetos.
  async findAll(): Promise<Postagem[]> {
    //
    return await this.postagemRepository.find();
  }

}
