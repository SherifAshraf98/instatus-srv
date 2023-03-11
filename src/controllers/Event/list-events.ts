import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { handleError } from '../../utils/formatted-response';

export const listEvents = async (req: Request, res: Response) => {
	try {
		const events = await prisma.events.findMany({ include: { users: true } });
		console.log('file: list-events.ts:9 ~ listEvents ~ events:', events);
		return res.send(events);
	} catch (e) {
		console.error(e);
		const errorResponse = handleError(e);
		res.status(errorResponse.error.statusCode);
		res.send(handleError(e));
	}
};
