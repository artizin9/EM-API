export enum Status {
    pending = 'pending',
    completed = 'completed',
    canceled = 'canceled'
}

export class Scheduling {
    constructor(
        public status: Status = Status.pending,
        public userId: string,
        public timeId: string,
        public createdAt: string,
        public finishedAt?: string,
        public readonly id?: string,
    ){};
}