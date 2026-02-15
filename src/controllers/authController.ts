import { Controller,Get } from '@inversifyjs/http-core';
import { type Context as HonoContext } from 'hono';
import { Context } from '@inversifyjs/http-hono';

import { logger } from '../utils/logger';

//Création du logger
const log = logger(module);

/**
 * Controller du login
 */
@Controller('/api/auth')
export class AuthController {
	/**
	 * Constructeur
	 */
	constructor() {}

	/**
	 * Récupération des informations de l'utilisateur authentifié
	 */
	@Get('/me')
	public async getInfo(@Context() context: HonoContext): Promise<Response> {
		//Log
		log.info(`Récupération des informations de l'utilisateur authentifié`);

		//Retour de l'utilisateur connecté
		return context.json({
			user: context.get('jwtPayload')
		});
	}
}