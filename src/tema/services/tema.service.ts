import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tema } from '../entities/tema.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

//classe de serviço
@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>,
  ) {}

  // métodos para manipular o repositório Tema

  async findAll(): Promise<Tema[]> {
    return await this.temaRepository.find({
      //O comando relations tem por objetivo exibir os Objetos da Classe Postagem que estão relacionados com os Objetos da Classe Tema
      relations: {
        postagem: true,
      },
    });
  }

  async findById(id: number): Promise<Tema> {
    let tema = await this.temaRepository.findOne({
        where: {
            id,
        },
        relations :{
            postagem: true,
        },

    });
    if (!tema)
    throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

    return tema;
  }
  async findByDescricao(descricao: string): Promise<Tema[]>{
    return await this.temaRepository.find({
        where: {
            descricao: ILike(`%${descricao}%`),
        },
        relations: {
            postagem: true,
        }
    });
  }

  async create(tema: Tema): Promise<Tema>{
   return await this.temaRepository.save(tema);
  }

  async update(tema: Tema): Promise<Tema>{
    let buscaTema: Tema = await this.findById(tema.id)

    if(!buscaTema || !tema.id)
    throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

    return await this.temaRepository.save(tema);
  }
  
  async delete(id: number): Promise<DeleteResult> {
    let buscaTema = await this.findById(id);

    if (!buscaTema)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

    return await this.temaRepository.delete(id);
  }

  

















}
