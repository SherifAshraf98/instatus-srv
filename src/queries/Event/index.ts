interface ListEventsQP {
	page: number;
	pageSize: number;
	search?: string;
	actorId?: number;
	targetId?: number;
	actionId?: string;
}