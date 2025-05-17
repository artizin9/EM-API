import { IPasswordResetRepository } from "../../domain/repositorys/IPasswordResetRepository";
import { EmailSendDTO } from "../../dto/emailSenderDTO";
import { emailSenderSchema } from "../../infra/schemas/emailSender.schema";
import { ServerError } from "../../shared/serverError";
import { IUserRepository } from "../../domain/repositorys/IUserRepository";
import { env } from "../../config/env";

export class sendPasswordRecoveryEmailUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordResetRepository: IPasswordResetRepository) {}

    async execute(data: EmailSendDTO){
        const parsedData = emailSenderSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Dados inválidos");

        const { email, ip } = parsedData.data!;

        const tokenUser = await this.passwordResetRepository.generateToken();
        const httpResetLink = `http://localhost:${env.PORT_FRONTEND}/forgot-password-user?token=${tokenUser}`;

        const userEmail = await this.userRepository.findUnique(email);
        if (!userEmail) throw new ServerError("Email não encontrado", 404);

        await this.passwordResetRepository.applyRatelimit(email, ip);
        await this.passwordResetRepository.createResetLinkToken(email, tokenUser);

        await this.passwordResetRepository.sendPasswordRecoveryEmail(userEmail.email, httpResetLink);
        await this.passwordResetRepository.validateResetLinkToken(tokenUser);

        return httpResetLink;
    }
}