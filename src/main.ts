import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const appOptions = {
    cors: true    
  };
  const app = await NestFactory.create(AppModule, appOptions);  
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.setGlobalPrefix('api');
  app.enableCors();

  const swaggerCustomOptions = {
    explorer: false,
    customCss: '.swagger-ui .topbar { background-color: black; display: none; } .swagger-ui img { display: none; }',
    customSiteTitle: 'The Firestore Uploader',
    customfavIcon: ""
  }

  const swaggerOptions = new DocumentBuilder()
    .setTitle('The Firestore Uploader')
    .setDescription('avmsistemas.net')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document, swaggerCustomOptions);

  const port = process.env.PORT || 3000;

  app.listen(port);
}
bootstrap();