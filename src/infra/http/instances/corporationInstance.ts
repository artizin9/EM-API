import { LogOutCorporationUseCase } from "../../../use-cases/auth/corporation/logOutCorporationUseCase";
import { CorporationLoginUseCase } from "../../../use-cases/auth/corporation/loginCorporationUseCase";
import { CreateCorporationUseCase } from "../../../use-cases/corporation/createUseCase";
import { CorporationDeleteUseCase } from "../../../use-cases/corporation/deleteUseCase";
import { CorporationFindAllUseCase } from "../../../use-cases/corporation/findAllUsecase";
import { CorporationReadUseCase } from "../../../use-cases/corporation/readUseCase";
import { CorportationUpdateUseCase } from "../../../use-cases/corporation/updateUseCase";
import { IPrismaCorporationRepository } from "../../database/IPrismaCorporationRepository";
import { LocalPhotoStorage } from "../../provider/localPhotoStorage";
import { CorporationController } from "../controllers/corporationController";
import { CorporationParseAndStoreMultipart } from "../helper/adapts/corporationParseAndStoreMultipart";

const prismaRepository = new IPrismaCorporationRepository;
const createCorporationUseCase = new CreateCorporationUseCase(prismaRepository);
const updateCorporationUseCase = new CorportationUpdateUseCase(prismaRepository);
const deleteCorporationUseCase = new CorporationDeleteUseCase(prismaRepository);
const readCorporationUseCase = new CorporationReadUseCase(prismaRepository);
const findAllCorporationUseCase = new CorporationFindAllUseCase(prismaRepository);
const loginCorporationUseCase = new CorporationLoginUseCase(prismaRepository);
const logOutCorporationUseCase = new LogOutCorporationUseCase(prismaRepository)
const photoStorage = new LocalPhotoStorage;
const multipartCorporation = new CorporationParseAndStoreMultipart(photoStorage);

export const corporationController = new CorporationController(
    createCorporationUseCase,
    updateCorporationUseCase,
    deleteCorporationUseCase,
    readCorporationUseCase,
    findAllCorporationUseCase,
    multipartCorporation,
    loginCorporationUseCase,
    logOutCorporationUseCase
)