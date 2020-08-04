import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { useExpressServer, useContainer } from 'routing-controllers';
import { useContainer as validatorUseContainer } from 'class-validator';
import { Container } from 'typedi';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { authMiddleWare } from './middlewares/auth.middleware';
import FakerService from './services/faker.service';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { Photo } from './entity/Photo';

// Bootload api, bind with react distros
(async () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, '../../', 'build')));
  app.use(express.static('public'));

  useContainer(Container);
  validatorUseContainer(Container);

  // Configuring & connecting to mysql storage
  await createConnection({
    name: 'default',
    type: 'mysql',
    host: 'database',
    port: 3306,
    username: 'root',
    password: 'myrootpassword',
    database: 'graminsta',
    synchronize: true,
    entities: [`${__dirname}/entity/*.js`],
  });

  // create and run server, with middlewares & controllers
  useExpressServer(app, {
    defaultErrorHandler: false,
    controllers: [`${__dirname}/controllers/*.js`],
    middlewares: [`${__dirname}/middlewares/*.js`],
    currentUserChecker: authMiddleWare,
  });

  // Bind port
  app.listen(8078, () => {
    console.log('Listening on port 8078');
  });

  // Set classes in containers for fake data generators, as they are out of scope of routes
  Container.set('user', User);
  Container.set('post', Post);
  Container.set('photo', Photo);
  const fakerService = Container.get(FakerService);
  await fakerService.generateFakeData({});
}
)();
