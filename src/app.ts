import express,{ Application } from 'express';
import { InversifyExpressHttpAdapter } from '@inversifyjs/http-express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';

import { container } from './config/inversify.config';
import { getJwtStrategy } from './config/security/authStrategy';

/**
 * Déclaration de l'application
 */
export class App {
	/** Application **/
	public app: Application;

	/**
	 * Constructeur
	 */
	constructor() {
		//Création de l'application
		this.app = express();
	}

	/**
	 * Initialisation de l'application
	 */
	public async init(): Promise<Application> {
		let app: Application;
		let adapter: InversifyExpressHttpAdapter;

		//Configuration de l'application
		await this.config(this.app);

		//Ajout de l'injection de dépendances
		adapter = new InversifyExpressHttpAdapter(container,undefined,this.app);

		//Construction de l'application
		app = await adapter.build();

		//Retour de l'application
		return app;
	}

	/**
	 * Configuration de l'application
	 */
	private async config(app: Application) {
		//Utilisation de la désérialisation JSON avec une taille maximale de 32Mo
		app.use(bodyParser.json({ limit: 32 * 1024 * 1024 }));

		//Activation du CORS
		app.use(cors());

		//Initialisation de Passport
		app.use(passport.initialize());

		//Définition des stratégies d'authentification
		passport.use(await getJwtStrategy());
	}
}