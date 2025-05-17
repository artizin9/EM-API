import { IPasswordResetRepository } from "../../domain/repositorys/IPasswordResetRepository";
import { IUserRepository } from "../../domain/repositorys/IUserRepository";
import { ServerError } from "../../shared/serverError";
import bcrypt from "bcryptjs";

export class ForgotPassUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordResetRepository: IPasswordResetRepository
    ){}

    async execute(email: string, password: string, token: string){
        const isValidToken = await this.passwordResetRepository.validateResetLinkToken(email);
        if (!isValidToken) throw new ServerError("Token inválido ou expirado", 401)
        
        const storedEmail = await this.passwordResetRepository.getEmailByToken(token);
        if (storedEmail !== email) throw new ServerError("Token inválido ou expirado", 401)

        const user = await this.userRepository.findUnique(email);
        if (!user) throw new ServerError("Usuário não foi encontrado", 404)
        
        user.password = await bcrypt.hash(password, 10);
        await this.userRepository.update(user);

        await this.passwordResetRepository.invalidateResetLinkToken(token);
        return user;
    }
}