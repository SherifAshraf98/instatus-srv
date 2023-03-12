import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { handleError, response, throwNoContent } from '../../utils/formatted-response';
import { ListEventsQueryParams } from '../../interfaces/Event/create-events';
import { getResourceParams } from '../../utils/resource-params';
import { SortOrderEnum } from '../../utils/enums';
import { ListEventsQP } from '../../queries/Event';

export const listEvents = async (req: Request<{}, {}, {}, ListEventsQP>, res: Response) => {
	try {
		const prisma = new PrismaClient();
		// validate query params
		const { page, pageSize, actionId, actorId, search, targetId } = getResourceParams<ListEventsQP>(
			req.query,
			Object.values(ListEventsQueryParams)
		);

		// filters
		const whereClause = {
			actorId,
			targetId,
			type: actionId,
			OR: [
				{
					actor: { OR: [{ name: { contains: search } }, { email: { contains: search } }] },
				},
				{
					eventTypes: { id: { contains: search } },
				},
			],
		};

		// get events count
		const eventsCount = await prisma.events.count({
			where: whereClause,
		});

		// Calculate the number of pages using the received page size
		const pageCount = Math.ceil(eventsCount / pageSize);

		// if the user sent page number exceeds the total number of pages, then return the last page
		if (page > pageCount) {
			throwNoContent();
			return;
		}

		const queryOffset = pageSize * (page - 1);

		// get events
		const events = await prisma.events.findMany({
			include: {
				actor: true,
				target: true,
				eventTypes: true,
			},
			where: whereClause,
			orderBy: { createdAt: SortOrderEnum.DESC },
			skip: queryOffset,
			take: pageSize,
		});

		return res.send(response(events, page, pageSize, eventsCount));
	} catch (e) {
		console.error(e);
		const errorResponse = handleError(e);
		res.status(errorResponse.error.statusCode);
		res.send(handleError(e));
	}
};
