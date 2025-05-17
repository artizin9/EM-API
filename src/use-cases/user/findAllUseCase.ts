import { IUserRepository } from "../../domain/repositorys/IUserRepository";
import { ServerError } from "../../shared/serverError";

export class FindAllUserUseCase {
    constructor(private userRepository: IUserRepository){}

    async execute(){
        const user = await this.userRepository.findMany();
        if (!user) throw new ServerError("Nenhum usuário encontrado", 409);
        
        return user;
    }
}