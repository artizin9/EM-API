import { Scheduling } from "./scheduling";

export class Time {
    constructor(
        public date: string,
        public corporationId?: string,
        public Scheduling?: Scheduling,
        public readonly id?: string
    ){};
}
