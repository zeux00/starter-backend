import { app } from '@azure/functions';

import { handler } from '../serverless';

/**
 * Export de l'application
 */
app.http('gateway',{
	methods: ['GET','POST','PUT','DELETE','OPTIONS'],
	authLevel: 'anonymous',
	route: '{*remainder}',
	handler: async (request,context) => await handler(request,context)
});