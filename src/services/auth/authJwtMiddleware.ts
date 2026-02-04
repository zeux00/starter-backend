import { Request,Response,NextFunction } from 'express';
import { injectable } from 'inversify';
import passport from 'passport';
import { Middleware } from '@inversifyjs/http-core';

@injectable()
export class AuthJwtMiddleware implements Middleware {
	/** Middleware pour la gestion du callback par OIDC **/
	private readonly authJwtMiddleware: (request: Request,response: Response,next: NextFunction) => void;

	/**
	 * Constructeur
	 */
	constructor() {
		//Création du middleware
		this.authJwtMiddleware = passport.authenticate('jwt',{ session: false });
	}

	/**
	 * Authentification de la requête
	 */
	public execute(request: Request,response: Response,next: NextFunction): any {
		//Authentification de la requête
		this.authJwtMiddleware(request,response,next);
	}
}