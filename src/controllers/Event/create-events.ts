import { Request, Response } from 'express';
import { CreateEventsBody } from '../../queries/Event';
import { handleError, response, throwBadRequest } from '../../utils/formatted-response';
import { PrismaClient } from '@prisma/client';
import { validateCreateEventBody } from '../../validators/Event';

export const createEvents = async (req: Request<{}, {}, CreateEventsBody, {}>, res: Response) => {
	try {
		// validate body
		const { actorId, targetId, type } = validateCreateEventBody(req.body?.event)!;
		const prisma = new PrismaClient();

		// validate existence of actorId, targetId, and actionId
		const [isValidActor, isValidTarget, isValidEventType] = await Promise.all([
			prisma.users.findFirst({ where: { id: actorId } }),
			prisma.users.findFirst({ where: { id: targetId } }),
			prisma.eventTypes.findFirst({ where: { id: type } }),
		]);

		// validate foreign keys
		if (!isValidActor || !isValidTarget || !isValidEventType) {
			throwBadRequest("Some Ids don't exist, make sure you add them first!");
			return;
		}

		const event = await prisma.events.create({ data: { actorId, targetId, type } });

		return res.send(response(event));
	} catch (e) {
		console.error(e);
		const errorResponse = handleError(e);
		res.status(errorResponse.error.statusCode);
		res.send(handleError(e));
	}
};
