import { ITimeRepository } from "../../domain/repositorys/ITimeRepository";
import { ServerError } from "../../shared/serverError";

export class AvailableTimeUseCase {
    constructor(private timeRepository: ITimeRepository) {}

    async execute() {
        const time = await this.timeRepository.availableTime();
        if (!time) throw new ServerError("Nenhum horário encontrado", 404);

        return time;
    }
}