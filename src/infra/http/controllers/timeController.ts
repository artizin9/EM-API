import { FastifyContextDTO } from "../../../dto/fastifyContextDTO";
import { AvailableTimeUseCase } from "../../../use-cases/time/availableTimeUseCase";
import { TimeCreateUseCase } from "../../../use-cases/time/createUseCase";
import { DeleteTimeUseCase } from "../../../use-cases/time/deleteUseCase";
import { FindAllTimeUseCase } from "../../../use-cases/time/findAllUseCase";
import { ReadTimeUseCase } from "../../../use-cases/time/readUseCase";
import { UpdateTimeUseCase } from "../../../use-cases/time/updateUseCase";
import { timeDTO } from "../../schemas/time.schema";

export class TimeController {
    constructor(
        private createUseCase: TimeCreateUseCase,
        private readUseCase: ReadTimeUseCase,
        private deleteUseCase: DeleteTimeUseCase,
        private availableUseCase: AvailableTimeUseCase,
        private updateUseCase: UpdateTimeUseCase,
        private findAllUseCase: FindAllTimeUseCase
    ){}

    async create(fastify: FastifyContextDTO){
        const data = fastify.req.body as timeDTO;
        const { corporationId } = fastify.req.params as { corporationId: string };
        const time = await this.createUseCase.execute(data, corporationId);
        fastify.res.status(201).send({message: "Horário criado com sucesso", ...time});
    }

    async update(fastify: FastifyContextDTO){
        const { id, corporationId } = fastify.req.params as { id: string, corporationId: string };
        const data = fastify.req.body as timeDTO;
        const time = await this.updateUseCase.execute(id, data, corporationId);
        fastify.res.send({message: "Horário atualizado com sucesso", ...time});
    }

    async delete(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as { id: string };
        const time = await this.deleteUseCase.execute(id);
        fastify.res.send({message: "Horário deletado com sucesso", time});
    }

    async read(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as { id: string };
        const time = await this.readUseCase.execute(id);
        fastify.res.send({time});
    }

    async findAll(fastify: FastifyContextDTO){
        const time = await this.findAllUseCase.execute();
        fastify.res.send({time});
    }

    async available(fastify: FastifyContextDTO){
        const time = await this.availableUseCase.execute();
        fastify.res.send({time});
    }
}