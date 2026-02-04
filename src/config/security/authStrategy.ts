import { Strategy as JwtStrategy,ExtractJwt } from 'passport-jwt';
import JwksRsa from 'jwks-rsa';
import { decode } from 'jsonwebtoken';

/**
 * Configuration du client JWKS
 */
const jwksClient = JwksRsa({
	cache: true,
	rateLimit: true,
	jwksRequestsPerMinute: 5,
	jwksUri: 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'
});

/**
 * Récupération de la clé publique pour la validation du token JWT
 */
const getKey = (request: any,rawJwtToken: string,callback: Function) => {
	let jwtToken: any;

	//Décodage du token JWT
	jwtToken = decode(rawJwtToken,{ complete: true });

	//Récupération du KeyID depuis le header du token
	jwksClient.getSigningKey(jwtToken.header.kid,(err: any,key: any) => {
		//Vérification de l'absence d'erreur
		if (!err)
			//Récupération de la clé publique ou du certificat
			callback(null,key.publicKey || key.rsaPublicKey);
		else
			//Retour de l'erreur
			callback(err);
	});
}

/**
 * Stratégie d'authentification par token JWT
 */
export const getJwtStrategy = async () => new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKeyProvider: getKey,
	issuer: `https://securetoken.google.com/${process.env['FIREBASE_APP']}`,
	audience: process.env['FIREBASE_APP'],
	algorithms: ['RS256']
},(jwtPayload: any,done: Function) => {
	//Retour de l'utilisateur
	return done(null,jwtPayload);
});