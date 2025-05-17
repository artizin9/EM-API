import { IUserRepository } from "../../domain/repositorys/IUserRepository";
import { ServerError } from "../../shared/serverError";

export class DeleteUserUseCase {
    constructor(private userRepository: IUserRepository){}
    
    async execute(id: string){
        if (!id) throw new ServerError("Escreva um id válido");

        const userExists = await this.userRepository.findById(id);
        if (!userExists) throw new ServerError("Usuário não encontrado", 404);
        
        await this.userRepository.delete(id);
        return { message: "Usuário deletado com sucesso" };
    }
}