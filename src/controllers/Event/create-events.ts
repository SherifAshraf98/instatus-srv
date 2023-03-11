import { Request, Response } from 'express';
import { handleError } from '../../utils/formatted-response';

export const createEvents = async (req: Request, res: Response) => {
	try {
		return res.send('Create Events Endpoint!');
	} catch (e) {
		console.error(e);
		const errorResponse = handleError(e);
		res.status(errorResponse.error.statusCode);
		res.send(handleError(e));
	}
};
