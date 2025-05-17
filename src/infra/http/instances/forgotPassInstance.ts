import { ForgotPassCorporationUseCase } from "../../../use-cases/forgotPassword/forgotPassCorporation";
import { ForgotPassUserUseCase } from "../../../use-cases/forgotPassword/forgotPassUser";
import { IPrismaCorporationRepository } from "../../database/IPrismaCorporationRepository";
import { IPrimasUserRepository } from "../../database/IPrismaUserRepository";
import { PasswordResetService } from "../../provider/password-reset.service";
import { SendEmailProvider } from "../../provider/sendEmailProvider";
import { ForgotPasswordController } from "../controllers/forgotPasswordController";

const prismaRepositoryUser = new IPrimasUserRepository();
const prismRepositoryCorp = new IPrismaCorporationRepository();
const emailSender = new SendEmailProvider();
const passwordResetService = new PasswordResetService(emailSender);
const forgotPassUser = new ForgotPassUserUseCase(prismaRepositoryUser, passwordResetService);
const forgotPassCorp = new ForgotPassCorporationUseCase(prismRepositoryCorp, passwordResetService);	

export const forgotPassController = new ForgotPasswordController(
    forgotPassUser,
    forgotPassCorp
)