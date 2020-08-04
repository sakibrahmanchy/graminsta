import 'reflect-metadata';
import { useExpressServer, useContainer, Action } from 'routing-controllers';
import { Container } from 'typedi';
import { useContainer as validatorUseContainer } from 'class-validator';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import path from 'path';
import { authMiddleWare } from './middlewares/auth.middleware';
import faker from 'faker';
import FakerService from './services/faker.service';
import {User} from './entity/User';
import {Post} from './entity/Post';
import {Photo} from './entity/Photo';
// its important to set container before any operation you do with routing-controllers,
// including importing controllers
(async () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, '../../', 'build')));
  app.use(express.static('public'));

  useContainer(Container);
  validatorUseContainer(Container);

  await createConnection({
    name: 'default',
    type: 'mysql',
    host: 'database',
    port: 3306,
    username: 'root',
    password: 'myrootpassword',
    database: 'graminsta',
    synchronize: true,
    entities: [`${__dirname}/entity/*.js`]
  });

  // create and run server
  useExpressServer(app, {
    defaultErrorHandler: false,
    controllers: [`${__dirname}/controllers/*.js`],
    middlewares: [`${__dirname}/middlewares/*.js`],
    currentUserChecker: authMiddleWare,
  });

  app.listen(8078, () => {
    console.log('Listening on port 8078');
  });

  Container.set('user', User);
  Container.set('post', Post);
  Container.set('photo', Photo);
  const fakerService = Container.get(FakerService);
  await fakerService.generateFakeData({});
}
)();
