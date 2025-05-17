import { ITimeRepository } from "../../domain/repositorys/ITimeRepository";
import { ServerError } from "../../shared/serverError";

export class DeleteTimeUseCase {
    constructor(private timeRepository: ITimeRepository){}

    async execute(id: string) {
        const time = await this.timeRepository.findUnique(id);
        if (!time) throw new ServerError("Horário não encontrado", 404);

        await this.timeRepository.delete(id);
        return id;
    }

}