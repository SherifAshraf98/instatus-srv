import { EventTypeEnum } from './enums';
import {
	validateEnumTypeQP,
	validateNumberGreaterThanOrEqualOneQP,
	validateNumberQP,
	validateStringQP,
} from './validators';

export const getResourceParams = <T extends Record<string, any>>(queryParams: any, keys: string[]): T => {
	const maxPageSize = 100;

	const paramsMap: Record<string, any> = {
		page: validateNumberGreaterThanOrEqualOneQP(queryParams?.page) ? +queryParams.page : 1,
		pageSize: validateNumberGreaterThanOrEqualOneQP(queryParams?.pageSize)
			? +queryParams.pageSize > maxPageSize
				? maxPageSize
				: +queryParams.pageSize
			: 10,
		search: validateStringQP(queryParams?.search),
		actionId: validateEnumTypeQP(queryParams?.actionId, Object.values(EventTypeEnum)),
		actorId: validateNumberQP(queryParams?.actorId),
		targetId: validateNumberQP(queryParams?.targetId),
	};
	return keys.reduce((p, c) => {
		Object.assign(p, { [c]: paramsMap[c] });
		return p;
	}, {} as T);
};
