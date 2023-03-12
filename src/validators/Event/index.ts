import { CreateEventsBody } from '../../queries/Event';
import { EventTypeEnum } from '../../utils/enums';
import { throwBadRequest } from '../../utils/formatted-response';
import { validateEnumType, validateNumber } from '../../utils/validators';

export const validateCreateEventBody = (event: CreateEventsBody['event']) => {
	const type = validateEnumType(event?.actionId, Object.values(EventTypeEnum));
	const actorId = validateNumber(event?.actorId?.toString());
	const targetId = validateNumber(event?.targetId?.toString());

	if (!type || !actorId || !targetId) {
		throwBadRequest('Invalid Body');
		return;
	}
	return { type, actorId, targetId };
};
