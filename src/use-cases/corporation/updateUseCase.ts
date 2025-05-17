import { ICorporationRepository } from "../../domain/repositorys/ICorporationRepository";
import { corporationSchema, UpdateCorporationDTO } from "../../infra/schemas/corporation.schema";
import { ServerError } from "../../shared/serverError";
import bcrypt from "bcryptjs";

export class CorportationUpdateUseCase {
    constructor(private corporationRepository: ICorporationRepository){}

    async execute(data: UpdateCorporationDTO, id: string){
        if (!id) throw new ServerError("Id não encontrado");

        const existingCorporation = await this.corporationRepository.findById(id);
        if (!existingCorporation) throw new ServerError("Empresa não encontrado", 404);

        const parsedData = corporationSchema.partial().safeParse(data);
        if (!parsedData.success) throw new ServerError("Informações inválidas");

        const { cnpj, email, name, password, photoURL, place } = parsedData.data!;

        if (cnpj !== existingCorporation.cnpj) {
            const isCnpjExist = await this.corporationRepository.findCNPJ(cnpj || id);
            if (isCnpjExist) throw new ServerError("CNPJ em uso", 409);
        }

        if (email !== existingCorporation.email) {
            const isEmailExist = await this.corporationRepository.findUnique(email || id);
            if (isEmailExist) throw new ServerError("Email em uso", 409);
        }

        if (name) existingCorporation.name = name;
        if (password) existingCorporation.password = await bcrypt.hash(password, 10);
        if (email) existingCorporation.email = email;
        if (photoURL) existingCorporation.photoURL = photoURL;
        if (place) existingCorporation.place = place;
        if (cnpj) existingCorporation.cnpj = cnpj;

        await this.corporationRepository.update(existingCorporation);
        return { ...existingCorporation };
    }
}