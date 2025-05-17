import { FastifyContextDTO } from "../../../dto/fastifyContextDTO";
import { ForgotPassCorporationUseCase } from "../../../use-cases/forgotPassword/forgotPassCorporation";
import { ForgotPassUserUseCase } from "../../../use-cases/forgotPassword/forgotPassUser";

export class ForgotPasswordController {
    constructor(
        private forgotPassUserUseCase: ForgotPassUserUseCase,
        private forgotPassCorpUseCase: ForgotPassCorporationUseCase
    ) {}

    async forgotPassUser(fastify: FastifyContextDTO) {
        const { email, password } = fastify.req.body as { email: string, password: string};
        const { token } = fastify.req.params as { token: string }
        const user = await this.forgotPassUserUseCase.execute(email, password, token);
        fastify.res.send({ message: "Senha alterada com sucesso!", ...user });
    }

    async forgotPassCorp(fastify: FastifyContextDTO) {
        const { email, password } = fastify.req.body as { email: string, password: string};
        const { token } = fastify.req.params as { token: string }
        const corporation = await this.forgotPassCorpUseCase.execute(email, password, token);
        fastify.res.send({ message: "Senha alterada com sucesso!", ...corporation });
    }
}
