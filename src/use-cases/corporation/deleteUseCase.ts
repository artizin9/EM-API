import { ICorporationRepository } from "../../domain/repositorys/ICorporationRepository";
import { ServerError } from "../../shared/serverError";

export class CorporationDeleteUseCase {
    constructor(
        private readonly corporationRepository: ICorporationRepository
    ) {}

    async execute(id: string){
        if (!id) throw new Error("Id não encontrado");

        const existingCorporation = await this.corporationRepository.findById(id);
        if (!existingCorporation) throw new ServerError("Empresa não encontrada", 404);

        await this.corporationRepository.delete(id);
        return { message: "Empresa deletada com sucesso" };
    }
}