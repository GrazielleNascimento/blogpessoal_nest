import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../entities/postagem.entity';

@Controller('/postagens')
export class PostagemController {

  //Cria um Construtor, que receberá as Injeções de Dependência.
  // Como precisaremos ter acesso aos Métodos da Classe PostagemService, foi injetado um Objeto desta Classe dentro do Construtor.
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  //Criamos o Método findAll(), que promete retornar uma Promise (que será enviada pela Classe PostagemService), contendo um array de Objetos Postagem.
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }
}
