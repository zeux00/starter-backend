import express from 'express';
import { ApplyMiddleware,Controller,Get,Request,Response } from '@inversifyjs/http-core';

import { TYPES } from '../config/types';
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
	@ApplyMiddleware(TYPES.AuthJwt)
	public async getInfo(@Request() request: express.Request,@Response() response: express.Response) {
		//Log
		log.info(`Récupération des informations de l'utilisateur authentifié : ${(request.user as any)?.sub ?? 'Unauthorized'}`);

		//Retour de l'utilisateur connecté
		response.status(request.isAuthenticated() ? 200 : 401).send(request.isAuthenticated() ? request.user : 'Unauthorized');
	}
}