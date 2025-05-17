import { randomUUID } from "crypto";
import { IUserRepository } from "../../domain/repositorys/IUserRepository";
import { userDTO, userSchema } from "../../infra/schemas/user.schema";
import { ServerError } from "../../shared/serverError";
import bcrypt from "bcryptjs"
import { User } from "../../domain/entities/user";

export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository
    ){};

    async execute(data: userDTO){
        const parsedData = userSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Informações inválidas");

        const { name, email, password, photoURL } = parsedData.data!;

        const isEmailExist = await this.userRepository.findUnique(email);
        if (isEmailExist) throw new ServerError("Email em uso", 409);

        const id = randomUUID();
        const hashPassword: string = await bcrypt.hash(password, 10)

        const user = new User(name, email, hashPassword, photoURL || "", [], id)
        await this.userRepository.create(user);

        return {...user};
        
    }
}