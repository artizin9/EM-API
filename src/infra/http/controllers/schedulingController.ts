import { FastifyContextDTO } from "../../../dto/fastifyContextDTO";
import { SchedulingIdsDTO } from "../../../dto/SchedulingIdsDTO";
import { CreateSchedulingUseCase } from "../../../use-cases/scheduling/createUseCase";
import { DeleteSchedulingUseCase } from "../../../use-cases/scheduling/deleteUseCase";
import { FindAllSchedulingUseCase } from "../../../use-cases/scheduling/findAllUseCase";
import { ReadSchedulingUseCase } from "../../../use-cases/scheduling/readUseCase";
import { UpdateSchedulingUseCase } from "../../../use-cases/scheduling/updateUseCase";

export class SchedulingController {
    constructor(
        private createSchedulingUseCase: CreateSchedulingUseCase,
        private updateSchedulingUseCase: UpdateSchedulingUseCase,
        private deleteSchedulingUseCase: DeleteSchedulingUseCase,
        private readSchedulingUseCase: ReadSchedulingUseCase,
        private findAllSchedulingUseCase: FindAllSchedulingUseCase,
    ){}

    async create(fastify: FastifyContextDTO){
        const { userId, timeId } = fastify.req.params as { userId: string, timeId: string };
        const scheduling = await this.createSchedulingUseCase.execute(userId, timeId);
        fastify.res.status(201).send({message: "Agendamento criado com sucesso!", ...scheduling});
    }

    async updateStatusCompleted(fastify: FastifyContextDTO){
        const dataParams = fastify.req.params as SchedulingIdsDTO
        const scheduling = await this.updateSchedulingUseCase.updateStatusCompleted(dataParams.id, dataParams.userId, dataParams.timeId);
        fastify.res.status(200).send({message: "Agendamento atualizado com sucesso!", ...scheduling});
    }

    async updateStatusCanceled(fastify: FastifyContextDTO){
        const dataParams = fastify.req.params as SchedulingIdsDTO
        const scheduling = await this.updateSchedulingUseCase.updateStatusCanceled(dataParams.id, dataParams.userId, dataParams.timeId);
        fastify.res.status(200).send({message: "Agendamento atualizado com sucesso!", ...scheduling});
    }

    async delete(fastify: FastifyContextDTO){
        const dataParams = fastify.req.params as SchedulingIdsDTO
        await this.deleteSchedulingUseCase.execute(dataParams.id);
        fastify.res.status(200).send({message: "Agendamento deletado com sucesso!"});
    }

    async read(fastify: FastifyContextDTO){
        const dataParams = fastify.req.params as SchedulingIdsDTO
        const scheduling = await this.readSchedulingUseCase.execute(dataParams.id);
        fastify.res.status(200).send({message: "Agendamento encontrado com sucesso!", ...scheduling});
    }

    async findAll(fastify: FastifyContextDTO){
        const scheduling = await this.findAllSchedulingUseCase.execute();
        fastify.res.status(200).send({message: "Agendamentos encontrados com sucesso!", ...scheduling});
    }
}