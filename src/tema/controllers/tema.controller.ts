import { Tema } from '../entities/tema.entity';
import { TemaService } from '../services/tema.service';



import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";


@Controller('/temas')
export class TemaController {

    constructor(private readonly temaService: TemaService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tema[]> {
        return this.temaService.findAll();
    }

}