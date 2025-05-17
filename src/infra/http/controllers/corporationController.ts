import { FastifyContextDTO } from "../../../dto/fastifyContextDTO";
import { CorporationLoginUseCase } from "../../../use-cases/auth/corporation/loginCorporationUseCase";
import { LogOutCorporationUseCase } from "../../../use-cases/auth/corporation/logOutCorporationUseCase";
import { CreateCorporationUseCase } from "../../../use-cases/corporation/createUseCase";
import { CorporationDeleteUseCase } from "../../../use-cases/corporation/deleteUseCase";
import { CorporationFindAllUseCase } from "../../../use-cases/corporation/findAllUsecase";
import { CorporationReadUseCase } from "../../../use-cases/corporation/readUseCase";
import { CorportationUpdateUseCase } from "../../../use-cases/corporation/updateUseCase";
import { CorporationParseAndStoreMultipart } from "../helper/adapts/corporationParseAndStoreMultipart";

export class CorporationController {
    constructor(
        private createUseCase: CreateCorporationUseCase,
        private updateUseCase: CorportationUpdateUseCase,
        private deleteUseCase: CorporationDeleteUseCase,
        private readUseCase: CorporationReadUseCase,
        private findAllUseCase: CorporationFindAllUseCase,
        private multipart: CorporationParseAndStoreMultipart,
        private loginUseCase: CorporationLoginUseCase,
        private logOutUseCase: LogOutCorporationUseCase
    ) {}

    async create(fastify: FastifyContextDTO){
        const parsedData = await this.multipart.handle(fastify.req, {fileRequired: false, mode: "create"});
        const corporation = await this.createUseCase.execute(parsedData);
        fastify.res.status(201).send({message: "Corporation criado com sucesso", ...corporation});
    }

    async update(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        const parsedData = await this.multipart.handle(fastify.req, { fileRequired: false, mode: "update" });
        const corporation = await this.updateUseCase.execute(parsedData, id);
        fastify.res.send({ message: "Corporation atualizado com sucesso", ...corporation });
      }

    async delete(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as {id: string};
        const corporation = await this.deleteUseCase.execute(id);
        fastify.res.send({message: "Corporation deletado com sucesso", corporation});
    }

    async read(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as {id: string};
        const corporation = await this.readUseCase.execute(id);
        fastify.res.send({corporation});
    }

    async findAllCorporations(fastify: FastifyContextDTO){
        const corporations = await this.findAllUseCase.execute();
        fastify.res.send({corporations});
    }

    async login(fastify: FastifyContextDTO){
        const { email, password } = fastify.req.body as {email: string, password: string};
        const corporation = await this.loginUseCase.execute(email, password);
        fastify.res.status(201).setCookie('token', corporation.token, {
            httpOnly: true,
            maxAge: 3600 * 24 * 7,
            path: '/corporation',
            sameSite: 'strict'
        }).send({message: "Login realizado com sucesso", ...corporation});
    }

    async logOut(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as { id: string };
        await this.logOutUseCase.execute(id);
        fastify.res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            path: '/corporation',
            sameSite: 'strict'
        })
    }
}