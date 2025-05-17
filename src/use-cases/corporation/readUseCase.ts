import { ICorporationRepository } from "../../domain/repositorys/ICorporationRepository";
import { ServerError } from "../../shared/serverError";

export class CorporationReadUseCase {
    constructor( private corporationRepository: ICorporationRepository){}

    async execute(id: string){
        if (!id) throw new Error("Id não encontrado");

        const existingCorporation = await this.corporationRepository.findById(id);
        if (!existingCorporation) throw new ServerError("Empresa não encontrada", 404);

        return { ...existingCorporation };
    }
}