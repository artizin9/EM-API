import { ITimeRepository } from "../../domain/repositorys/ITimeRepository";
import { ServerError } from "../../shared/serverError";

export class FindAllTimeUseCase {
    constructor(private timeRepository: ITimeRepository) {}

    async execute() {
        const times = await this.timeRepository.findMany();
        if (!times) throw new ServerError("Nenhum horário encontrado", 404);

        return times;
    }
}