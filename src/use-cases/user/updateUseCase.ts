import { IUserRepository } from "../../domain/repositorys/IUserRepository";
import { updateUserDTO, userSchema } from "../../infra/schemas/user.schema";
import { ServerError } from "../../shared/serverError";
import bcrypt from "bcryptjs";

export class UpdateUserUseCase{
    constructor(private userRepository: IUserRepository){}

    async execute(data: updateUserDTO & { photoURL?: string }, id: string){
        if (!id) throw new ServerError("É necessário por um id")

        const parsedData = userSchema.partial().safeParse(data);
        if (!parsedData.success) throw new ServerError("Informações inválidas")
        
        const {name, password, email, photoURL} = parsedData.data!

        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) throw new ServerError("Usuário não encontrado")
        
        if (email !== existingUser.email) {
            const isEmailExist = await this.userRepository.findUnique(email || id);
            if (isEmailExist) throw new ServerError("Email em uso", 409);
        }

        if (name) existingUser.name = name;
        if (password) existingUser.password = await bcrypt.hash(password, 10);
        if (email) existingUser.email = email;
        if (photoURL) existingUser.photoURL = photoURL;

        await this.userRepository.update(existingUser);
        return {...existingUser};
    }
}