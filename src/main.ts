import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; //Importação do pacote ValidationPipe que foi instalado anteriormente



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 // ajusta fuso horario
 process.env.TZ ='-03:00'; 

 //checa validacoes nos atributos  da classe entity recebido do corpo das requisicoes HTTP
 app.useGlobalPipes(new ValidationPipe());
 
 //habilita  a propriedade Cross Origin (Cors) em toda a aplicação.
 // Indica que todas as Classes Controladoras aceitarão todas as requisições realizadas de fora do Domínio (atualmente o seu domínio é localhost
app.enableCors()

//altera porta 3000 pois o react usa essa porta
await app.listen(4000);


}
bootstrap();
