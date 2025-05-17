import { Scheduling } from "./scheduling";

export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public photoURL: string,
        public Scheduling?: Scheduling[],
        public readonly id?: string,
    ){};
}