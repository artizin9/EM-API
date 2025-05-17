import { ISchedulingRepository } from "../../domain/repositorys/IScheduling";
import { ServerError } from "../../shared/serverError";

export class ReadSchedulingUseCase {
    constructor(
        private schedulingRepository: ISchedulingRepository,
    ){}

    async execute(id: string){
            const scheduling = await this.schedulingRepository.findUnique(id);
            if (!scheduling) throw new ServerError("Agendamento não encontrado", 404);

            return scheduling;
    }
}