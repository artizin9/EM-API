import { ICorporationRepository } from "../../domain/repositorys/ICorporationRepository";
import { ITimeRepository } from "../../domain/repositorys/ITimeRepository";
import { timeDTO, timeSchema } from "../../infra/schemas/time.schema";
import { ServerError } from "../../shared/serverError";

export class UpdateTimeUseCase {
    constructor(
        private timeRepository: ITimeRepository,
        private CorporationRepository: ICorporationRepository
    ){}
    
    async execute(id: string, data: timeDTO, corporationId: string){
        if (!id || !corporationId) throw new ServerError("ID inválido");

        const parsedData = timeSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Data inválida");

        const { date } = parsedData.data;
        
        const corporation = await this.CorporationRepository.findById(corporationId);
        if (!corporation) throw new ServerError("Corporação não encontrada", 404);

        const isTimeExist = await this.timeRepository.findUnique(id);
        if (!isTimeExist) throw new ServerError("Horário não encontrado", 404);

        const isTimeAlreadyExist = await this.timeRepository.findByDateAndCorporation(date, corporationId);
        if (isTimeAlreadyExist) throw new ServerError("Horário já cadastrado", 409);

        const time = await this.timeRepository.update({id, date});
        if (!time) throw new ServerError("Erro ao atualizar horário", 500);

        return time;
    }
}