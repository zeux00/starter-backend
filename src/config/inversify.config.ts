import { Container } from 'inversify';
import 'reflect-metadata';

import { AuthController } from '../controllers/authController';

//Création du container
const container: Container = new Container();

//Déclaration des controllers
container.bind<any>(AuthController).toSelf().inSingletonScope();

//Export du container
export { container };