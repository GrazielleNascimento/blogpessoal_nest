import { Tema } from '../entities/tema.entity';
import { TemaService } from '../services/tema.service';



import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";


@Controller('/temas')
export class TemaController {

    constructor(private readonly temaService: TemaService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tema[]> {
        return this.temaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id:number): Promise<Tema> {
        return this.temaService.findById(id);
    }

    @Get('/descricao/:descricao')
    findByDescricao(@Param('descricao') descricao: string): Promise<Tema[]> {
        return this.temaService.findByDescricao(descricao);
    }





}