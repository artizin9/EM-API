import { randomUUID } from "crypto";
import { Time } from "../../domain/entities/time";
import { ICorporationRepository } from "../../domain/repositorys/ICorporationRepository";
import { ITimeRepository } from "../../domain/repositorys/ITimeRepository";
import { timeDTO, timeSchema } from "../../infra/schemas/time.schema";
import { ServerError } from "../../shared/serverError";

export class TimeCreateUseCase {
    constructor(
        private timeRepository: ITimeRepository,
        private corporationRepository: ICorporationRepository
    ){}
    
    async execute(data: timeDTO, corporationId: string){
        const parsedData = timeSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Data inválida");

        const { date } = parsedData.data;
        const corporation = await this.corporationRepository.findById(corporationId);
        if (!corporation) throw new ServerError("Corporação não encontrada", 404);

        const isTimeExist = await this.timeRepository.findByDateAndCorporation(date, corporationId);
        if (isTimeExist) throw new ServerError("Horário já cadastrado", 409);

        const currentDate = new Date();
        if (new Date(date) < currentDate) {
            throw new ServerError("Data não pode ser no passado", 400);
        }

        const idTime = randomUUID();
        const time = new Time(date, corporationId, undefined, idTime);
        await this.timeRepository.create(time);

        return time;
    }
}