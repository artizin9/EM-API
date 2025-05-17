import { IUserRepository } from "../../../domain/repositorys/IUserRepository";
import { ServerError } from "../../../shared/serverError";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"

export class LoginUserUseCase {
    constructor(private userRepository: IUserRepository){}

    async execute(data: {email: string, password: string}){
        const {email, password} = data;
        if (!email || !password) throw new ServerError("Credencias inválidas", 401);

        const user = await this.userRepository.findUnique(email);
        if (!user) throw new ServerError("Credencias inválidas", 401);

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) throw new ServerError("Credencias inválidas", 401);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
        return {name: user.name, email: email, token};
    }
}