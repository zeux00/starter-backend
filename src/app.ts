import { Hono } from 'hono';
import { InversifyHonoHttpAdapter } from '@inversifyjs/http-hono';
import { cors } from 'hono/cors';
import { jwk } from 'hono/jwk';

import { container } from './config/inversify.config';

/**
 * Déclaration de l'application
 */
export class App {
	/** Application **/
	public app: Hono;

	/**
	 * Constructeur
	 */
	constructor() {
		//Création de l'application
		this.app = new Hono();
	}

	/**
	 * Initialisation de l'application
	 */
	public async init(): Promise<Hono> {
		let app: Hono;
		let adapter: InversifyHonoHttpAdapter;

		//Configuration de l'application
		await this.config(this.app);

		//Ajout de l'injection de dépendances
		adapter = new InversifyHonoHttpAdapter(container,undefined,this.app);

		//Construction de l'application
		app = await adapter.build();

		//Retour de l'application
		return app;
	}

	/**
	 * Configuration de l'application
	 */
	private async config(app: Hono) {
		//Définition de l'API de base
		app.basePath('/api');

		//Gestion de l'authentification par JWT (avec Firebase)
		app.use('/api/*',jwk({
			jwks_uri: 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com',
			alg: ['RS256']
		}));

		//Activation du CORS
		app.use(cors());
	}
}