import { randomUUID } from "crypto";
import { ICorporationRepository } from "../../domain/repositorys/ICorporationRepository";
import { CorporationDTO, corporationSchema } from "../../infra/schemas/corporation.schema";
import { ServerError } from "../../shared/serverError";
import bcrypt from "bcryptjs";
import { Corporation } from "../../domain/entities/corporation";

export class CreateCorporationUseCase {
    constructor(private corporationRepository: ICorporationRepository){}

    async execute(data: CorporationDTO){
        const parsedData = corporationSchema.safeParse(data);
        if (!parsedData.success) throw new Error("Informações inválidas");

        const { cnpj, email, name, password, photoURL, place } = parsedData.data!;

        const isEmailExist = await this.corporationRepository.findUnique(email);
        if (isEmailExist) throw new ServerError("Email em uso", 409);

        const isCnpjExist = await this.corporationRepository.findUnique(cnpj);
        if (isCnpjExist) throw new ServerError("CNPJ em uso", 409);

        const hasedPassword: string = await bcrypt.hash(password, 10);
        const id = randomUUID();

        const corporation = new Corporation(cnpj, email, name, hasedPassword, photoURL || "", place, [], id);
        await this.corporationRepository.create(corporation);

        return { ...corporation };
    }
}