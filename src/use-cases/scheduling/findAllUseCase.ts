import { ISchedulingRepository } from "../../domain/repositorys/IScheduling";
import { ServerError } from "../../shared/serverError";

export class FindAllSchedulingUseCase {
    constructor(
        private schedulingRepository: ISchedulingRepository,
    ){}

    async execute(){
            const schedulings = await this.schedulingRepository.findMany();
            if (!schedulings) throw new ServerError("Nenhum agendamento foi encontrado", 404);

            return schedulings;
    }
}