import { randomBytes } from "crypto";
import { IPasswordResetRepository } from "../../domain/repositorys/IPasswordResetRepository";
import { redis } from "../../config/redis";
import { ServerError } from "../../shared/serverError";
import { SendEmailProvider } from "./sendEmailProvider";

export class PasswordResetService implements IPasswordResetRepository{
    constructor(private emailSender: SendEmailProvider) {}

    async generateToken(): Promise<string> {
        return randomBytes(32).toString("hex");
    }

    async createResetLinkToken(email: string, token:string): Promise<string> {
        await redis.setex(`password-reset:${token}`, 3600, email);
        return token;
    }

    async validateResetLinkToken(token: string): Promise<boolean> {
        const userId = await redis.get(`password-reset:${token}`);
        if (!userId) return false;
        return true;
    }
    
    async getEmailByToken(token: string): Promise<string | null> {
        return await redis.get(`password-reset:${token}`);
    }
    
    async invalidateResetLinkToken(token: string): Promise<void> {
        await redis.del(`password-reset:${token}`);
    }

    async applyRatelimit(email: string, ip: string): Promise<void> {
        const ipKey = `password-reset:${ip}`;
        const ipCount = parseFloat(await redis.incrbyfloat(ipKey, 1));

        if (ipCount === 1) await redis.expire(ipKey, 3600);
        if (ipCount > 5) throw new ServerError("Muitas tentativas de recuperação. Tente novamente mais tarde", 429);

        const emailKey = `password-reset:${email}`;
        const emailCount = parseFloat(await redis.incrbyfloat(emailKey, 1));

        if (emailCount === 1) await redis.expire(emailKey, 3600);
        if (emailCount > 5) throw new ServerError("Muitas tentativas de recuperação. Tente novamente mais tarde", 429);
    }

    async sendPasswordRecoveryEmail(email: string, resetLink: string): Promise<void>{
        await this.emailSender.sendPasswordRecoveryEmail({email, resetLink})
    }

}