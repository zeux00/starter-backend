import { serve } from '@hono/node-server'

import { App } from './app';
import { logger } from './utils/logger';

//Création du logger
const log = logger(module);

//Création de l'application
export const app: App = new App();

//Initialisation de l'application
export const server = app.init().then(app => {
	//Déploiement de l'application
	serve({
		fetch: app.fetch,
		port: parseInt(process.env['PORT'] as string) || 3000
	});

	//Log
	log.info(`Démarrage de l'application`);
});