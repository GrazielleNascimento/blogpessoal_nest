import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
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

  @Get('/:id')
  @HttpCode(HttpStatus.OK)

  //@Param('id'): Este Decorator insere o valor enviado na variável de caminho id (:id),
  // no parâmetro do Método findById( @Param('id') id: number );
  //ParseIntPipe: Converte o valor da variável de caminho id (inicialmente uma string) em um numero. Caso não seja possível converter (o usuário digitou algo diferente de um numero), ele retorna uma mensagem de erro 
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.findById(id)
  }
}
