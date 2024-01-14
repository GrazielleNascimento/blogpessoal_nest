import { TemaService } from './../../tema/services/tema.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //: Importamos a Classe Repository, do Módulo typeorm, do pacote Typeorm.
import { Postagem } from '../entities/postagem.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

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
    private temaService: TemaService
  ) {}

  //Criamos o Método Assíncrono (async), chamado findAll(), que promete retornar uma Promise contendo um array de Objetos da Classe Postagem.
  //Como o Método findAll() lista vários Objetos é necessário criar um array para armazenar todos os Objetos.
  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      relations: {
        tema: true,
      },
    });
  }

  async findById(id: number): Promise<Postagem> {
    //Como o Método findById(id: number) lista apenas um Objeto específico,
    // diferente do Método findAll() que lista todos, será necessário
    // criar apenas um Objeto para armazenar o Objeto procurado.
    let postagem = await this.postagemRepository.findOne({
      //declaramos a clausula where, com o critério id,
      //ou seja, localize a Postagem cujo atributo id
      //seja igual ao id enviado no parâmetro do Método findById(id: number).

      where: {
        id,
      },
      relations: {
        tema: true,
      },
    });
    if (!postagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
  }
  async findByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      //Declaramos a clausula where, com o critério ILike(%${titulo}%),
      // ou seja, localize a Postagem cujo atributo titulo contenha,
      //em qualquer parte, a string titulo enviada no parâmetro do Método findByTitulo(titulo: string).
      where: {
        titulo: ILike(`%${titulo}%`), //O ILike (Insensitive Like), ignora se a string foi digitada com letras maiúsculas ou minúsculas
      },
      relations: {
        tema: true,
      },
    });
  }
  // Método create(postagem: Postagem) possui um parâmetro do tipo Postagem, chamado postagem.
  //Esta variável receberá um Objeto da Classe Postagem,
  //que foi enviado no Corpo da Requisição (Request Body),
  // conforme as regras definidas na Entidade Postagem (Tamanho, Pode ser Nulo, Pode ser vazio, entre outras). O Objeto postagem será enviado pelo Método da Classe PostagemController
  async create(postagem: Postagem): Promise<Postagem> {
    if (postagem.tema) { //O objetivo é checar se o Tema que será associado ao Objeto Postagem existe

      let tema = await  this.temaService.findById(postagem.tema.id);

      if (!tema)
        throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

      return await this.postagemRepository.save(postagem);
    }
    return await this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    let buscaPostagem: Postagem = await this.findById(postagem.id);

    //Verifica se buscaPostagem é nulo ou se o id da postagem(JSON) é nulo.
    if (!buscaPostagem || !postagem.id)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

      if (postagem.tema){
            
        let tema = await this.temaService.findById(postagem.tema.id)
        
        //Verifica se o Objeto tema é nulo, ou seja, não foi encontrado.
        if (!tema) 
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
      
            return await this.postagemRepository.save(postagem);
      }

    return await this.postagemRepository.save(postagem);
     
    }


  async delete(id: number): Promise<DeleteResult> {
    let buscaPostagem = await this.findById(id);

    if (!buscaPostagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return await this.postagemRepository.delete(id);
  }
}
