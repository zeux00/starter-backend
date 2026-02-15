import { app as azureApp,HttpRequest,InvocationContext } from '@azure/functions';
import { Hono } from 'hono';

import { App } from '../app';

/** API **/
let api: Hono;

/**
 * Export de l'application
 */
azureApp.http('proxy',{
	methods: ['GET','POST','PUT','DELETE','OPTIONS'],
	authLevel: 'anonymous',
	route: '{*segments}',
	handler: async (request: HttpRequest,context: InvocationContext) => {
		//Vérification de l'API
		if (!api)
			//Création de l'API
			api = await new App().init();

		//Aiguillage de la requête
		return await api.fetch(request as any);
	}
});