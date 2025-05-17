import { IPasswordResetRepository } from "../../domain/repositorys/IPasswordResetRepository";
import { EmailSendDTO } from "../../dto/emailSenderDTO";
import { emailSenderSchema } from "../../infra/schemas/emailSender.schema";
import { ServerError } from "../../shared/serverError";
import { env } from "../../config/env";
import { ICorporationRepository } from "../../domain/repositorys/ICorporationRepository";

export class sendPasswordRecoveryEmailCorporationUseCase {
    constructor(
        private corporationRepository: ICorporationRepository,
        private passwordResetRepository: IPasswordResetRepository) {}

    async execute(data: EmailSendDTO){
        const parsedData = emailSenderSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Dados inválidos");

        const { email, ip } = parsedData.data!;

        const corporationToken = await this.passwordResetRepository.generateToken();
        const httpResetLink = `http://localhost:${env.PORT_FRONTEND}/forgot-password-corporation?token=${corporationToken}`;

        const corporationEmail = await this.corporationRepository.findUnique(email);
        if (!corporationEmail) throw new ServerError("Email não encontrado", 404);

        await this.passwordResetRepository.applyRatelimit(email, ip);
        await this.passwordResetRepository.createResetLinkToken(email, corporationToken);

        await this.passwordResetRepository.sendPasswordRecoveryEmail(corporationEmail.email, httpResetLink);

        return httpResetLink;
    }
}