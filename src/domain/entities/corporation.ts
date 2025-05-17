import { Time } from "./time";

export class Corporation {
    constructor(
        public cnpj: string,
        public email: string,
        public name: string,
        public password: string,
        public photoURL: string,
        public place: string,
        public times?: Time[],
        public readonly id?: string
    ){};
}
