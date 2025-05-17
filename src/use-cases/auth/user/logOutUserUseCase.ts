import { IUserRepository } from "../../../domain/repositorys/IUserRepository";
import { ServerError } from "../../../shared/serverError";

export class LogOutUserUseCase {
    constructor(private userRepository: IUserRepository){};

    async execute(id: string){
        const user = await this.userRepository.findById(id);
        if (!user) throw new ServerError("User not found", 404);

        return id;
    }
}