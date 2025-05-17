import { ICorporationRepository } from "../../../domain/repositorys/ICorporationRepository";
import { ServerError } from "../../../shared/serverError";

export class LogOutCorporationUseCase {
    constructor(private corporationRepository: ICorporationRepository){};

    async execute(id: string){
        const user = await this.corporationRepository.findById(id);
        if (!user) throw new ServerError("User not found", 404);

        return id;
    }
}