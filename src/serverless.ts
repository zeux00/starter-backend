import ServerlessHttp from 'serverless-http';

import { app } from './index';

let serverlessHandler: any;

/**
 * Initialisation de l'application serverless
 */
async function initializeApp() {
	//Initialisation de l'application
	serverlessHandler = ServerlessHttp(await app.init())
}

/**
 * Export de l'application
 */
export const handler = async (event: any,context: any) => {
	//Vérification de l'initialisation de l'application
	if (!serverlessHandler)
		//Initialisation de l'application
		await initializeApp();

	//Retour de l'application
	return serverlessHandler(event,context);
};