import { ICorporationRepository } from "../../domain/repositorys/ICorporationRepository";
import { IPasswordResetRepository } from "../../domain/repositorys/IPasswordResetRepository";
import { ServerError } from "../../shared/serverError";
import bcrypt from "bcryptjs";

export class ForgotPassCorporationUseCase {
    constructor(
        private corporationRepository: ICorporationRepository,
        private passwordResetRepository: IPasswordResetRepository
    ){}

    async execute(email: string, password: string, token: string){
        const isValidToken = await this.passwordResetRepository.validateResetLinkToken(email);
        if (!isValidToken) throw new ServerError("Token inválido ou expirado", 401)

        const storedEmail = await this.passwordResetRepository.getEmailByToken(token);
        if (storedEmail !== email) throw new ServerError("Token inválido ou expirado", 401)
        
        const corporation = await this.corporationRepository.findUnique(email);
        if (!corporation) throw new ServerError("Corporação não foi encontrada", 404)
        
        corporation.password = await bcrypt.hash(password, 10);
        await this.corporationRepository.update(corporation);

        await this.passwordResetRepository.invalidateResetLinkToken(token);
        return corporation;
    }
}