import { App } from './app';
import { logger } from './utils/logger';

//Création du logger
const log = logger(module);

//Création de l'application
export const app: App = new App();

//Initialisation de l'application
export const server = app.init().then(app => {
	//Démarrage de l'application
	return app.listen(process.env['PORT'] || 3000,() => {
		//Log
		log.info(`Démarrage de l'application`);
	});
});