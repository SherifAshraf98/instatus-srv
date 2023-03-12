export interface ListEventsQP {
	page: number;
	pageSize: number;
	search?: string;
	actorId?: number;
	targetId?: number;
	actionId?: string;
}

export interface CreateEventsBody {
	event: {
		actionId: string;
		actorId: string;
		targetId: string;
	};
}
