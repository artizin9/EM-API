import { sendPasswordRecoveryEmailCorporationUseCase } from "../../../use-cases/emailSender/sendEmailPasswordRecoveryEmailCorporation";
import { sendPasswordRecoveryEmailUserUseCase } from "../../../use-cases/emailSender/sendEmailPasswordRecoveryEmailUser";
import { IPrismaCorporationRepository } from "../../database/IPrismaCorporationRepository";
import { IPrimasUserRepository } from "../../database/IPrismaUserRepository";
import { PasswordResetService } from "../../provider/password-reset.service";
import { SendEmailProvider } from "../../provider/sendEmailProvider";
import { EmailSenderController } from "../controllers/emailSenderController";

const emailSender = new SendEmailProvider();
const prismaRepositoryUser = new IPrimasUserRepository();
const prismaRepositoryCorporation = new IPrismaCorporationRepository();
const passwordResetService = new PasswordResetService(emailSender);
const sendEmailPasswordRecoveryEmailUser = new sendPasswordRecoveryEmailUserUseCase( prismaRepositoryUser, passwordResetService);
const sendEmailPasswordRecoveryEmailCorporation = new sendPasswordRecoveryEmailCorporationUseCase(prismaRepositoryCorporation, passwordResetService);

export const sendEmailController = new EmailSenderController(
    sendEmailPasswordRecoveryEmailUser,
    sendEmailPasswordRecoveryEmailCorporation
);