import path from 'path';
import { createLogger,format,transports } from 'winston';

/** Variables de formatage */
const { combine,label,json,printf,colorize,timestamp } = format;

/**
 * Extraction du nom du module
 */
const getModuleName = (callingModule: any): string => {
	let listePaths;

	//Découage du nom du module
	listePaths = callingModule.filename.split(path.sep);

	//Retour des 2 derniers segments
	return path.join(listePaths[listePaths.length - 2],listePaths.pop());
}

/**
 * Récupération du format de logging
 */
const getLogFormat = (environment: string) => {
	switch (environment) {
	case 'PRODUCTION':
		//Format JSON
		return (callingModule: any) => combine(label({ label: getModuleName(callingModule) })
			,json()
		);
	default:
		//Format colorisé en console
		return (callingModule: any) => combine(colorize()
			,timestamp({ format: 'HH:mm:ss' })
			,label({ label: getModuleName(callingModule) })
			,printf(({ level,message,label,timestamp }) => `${timestamp} [${label}] ${level}: ${message}`)
		);
	}
}

/**
 * Logger
 */
const logger = (callingModule: any) => {
	//Création du logger
	return createLogger({
		format: getLogFormat(process.env['ENVIRONMENT'] as string)(callingModule),
		transports: [new transports.Console()].filter(f => !!f)
	});
};

/**
 * Export des propriétés
 */
export { logger };