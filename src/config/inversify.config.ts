import { Container } from 'inversify';
import 'reflect-metadata';

import { AuthController } from '../controllers/authController';

import { TYPES } from './types';
import { AuthJwtMiddleware } from '../services/auth/authJwtMiddleware';

//Création du container
const container: Container = new Container();

//Déclaration des middlewares d'authentification
container.bind<any>(TYPES.AuthJwt).to(AuthJwtMiddleware).inSingletonScope();

//Déclaration des controllers
container.bind<any>(AuthController).toSelf().inSingletonScope();

//Export du container
export { container };