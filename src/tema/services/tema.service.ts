import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { Repository } from "typeorm";

//classe de serviço
@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>,
    ) {}

   // métodos para manipular o repositório Tema

   async findAll(): Promise<Tema[]>{
    return await this.temaRepository.find({
       
        //O comando relations tem por objetivo exibir os Objetos da Classe Postagem que estão relacionados com os Objetos da Classe Tema
        relations: {
            postagem: true
        }
    });
    
   }
}