import { ICorporationRepository } from "../../../domain/repositorys/ICorporationRepository";
import { ServerError } from "../../../shared/serverError";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export class CorporationLoginUseCase {
    constructor(private corporationRepository: ICorporationRepository){}

    async execute(email: string, password: string){
        if (!email || !password) throw new ServerError("Credencias inválidas", 401);

        const corporation = await this.corporationRepository.findUnique(email);
        if (!corporation) throw new ServerError("Credencias inválidas", 401);

        const isPassword = await bcrypt.compare(password, corporation.password);
        if (!isPassword) throw new ServerError("Credencias inválidas", 401);

        const token = jwt.sign({ id: corporation.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        return {name: corporation.name, email: corporation.email, token: token};
    }
}