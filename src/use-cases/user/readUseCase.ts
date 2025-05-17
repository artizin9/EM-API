import { IUserRepository } from "../../domain/repositorys/IUserRepository";
import { ServerError } from "../../shared/serverError";

export class ReadUserUseCase {
    constructor(private userRepository: IUserRepository){}

    async execute(id: string){
        if (!id) throw new ServerError("Escreva um id válido");
        const user = await this.userRepository.findById(id);
        return user;
    }
}