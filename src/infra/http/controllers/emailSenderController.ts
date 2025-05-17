import { FastifyContextDTO } from "../../../dto/fastifyContextDTO";
import { sendPasswordRecoveryEmailCorporationUseCase } from "../../../use-cases/emailSender/sendEmailPasswordRecoveryEmailCorporation";
import { sendPasswordRecoveryEmailUserUseCase } from "../../../use-cases/emailSender/sendEmailPasswordRecoveryEmailUser";

export class EmailSenderController {
    constructor(
        private emailSenderUseCaseUser: sendPasswordRecoveryEmailUserUseCase,
        private emailSenderUseCaseCorporation: sendPasswordRecoveryEmailCorporationUseCase
    ){}

    async senderEmailUser(fastify: FastifyContextDTO){
        const { email } = fastify.req.body as { email: string };
        const ip = fastify.req.ip;
        const link = await this.emailSenderUseCaseUser.execute({email, ip});
        fastify.res.send("Link: " + link );
    }

    async senderEmailCorporation(fastify: FastifyContextDTO){
        const { email } = fastify.req.body as { email: string };
        const ip = fastify.req.ip;
        const link = await this.emailSenderUseCaseCorporation.execute({email, ip});
        fastify.res.send("Link: " + link );
    }
}