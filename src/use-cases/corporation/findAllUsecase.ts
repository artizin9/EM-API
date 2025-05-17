import { ICorporationRepository } from "../../domain/repositorys/ICorporationRepository";
import { ServerError } from "../../shared/serverError";

export class CorporationFindAllUseCase {
    constructor(private corporationRepository: ICorporationRepository) {}

    async execute() {
        const corporations = await this.corporationRepository.findMany();
        if (!corporations) throw new ServerError("Nenhuma empresa encontrada", 404);

        return corporations;
    }
}