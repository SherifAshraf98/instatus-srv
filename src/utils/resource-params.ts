import { EventTypeEnum } from './enums';
import { validateEnumType, validateNumberGreaterThanOrEqualOne, validateNumber, validateString } from './validators';

export const getResourceParams = <T extends Record<string, any>>(queryParams: any, keys: string[]): T => {
	const maxPageSize = 100;

	const paramsMap: Record<string, any> = {
		page: validateNumberGreaterThanOrEqualOne(queryParams?.page) ? +queryParams.page : 1,
		pageSize: validateNumberGreaterThanOrEqualOne(queryParams?.pageSize)
			? +queryParams.pageSize > maxPageSize
				? maxPageSize
				: +queryParams.pageSize
			: 10,
		search: validateString(queryParams?.search),
		actionId: validateEnumType(queryParams?.actionId, Object.values(EventTypeEnum)),
		actorId: validateNumber(queryParams?.actorId),
		targetId: validateNumber(queryParams?.targetId),
	};
	return keys.reduce((p, c) => {
		Object.assign(p, { [c]: paramsMap[c] });
		return p;
	}, {} as T);
};
