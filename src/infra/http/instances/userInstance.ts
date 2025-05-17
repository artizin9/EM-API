import { CreateUserUseCase } from "../../../use-cases/user/createUseCase";
import { DeleteUserUseCase } from "../../../use-cases/user/deleteUseCase";
import { FindAllUserUseCase } from "../../../use-cases/user/findAllUseCase";
import { ReadUserUseCase } from "../../../use-cases/user/readUseCase";
import { UpdateUserUseCase } from "../../../use-cases/user/updateUseCase";
import { UserController } from "../controllers/userController";
import { IPrimasUserRepository } from "../../database/IPrismaUserRepository";
import { UserParseAndStoreMultipart } from "../helper/adapts/userParseAndStoreMultipart";
import { LocalPhotoStorage } from "../../provider/localPhotoStorage";
import { LoginUserUseCase } from "../../../use-cases/auth/user/loginUserUseCase";
import { LogOutUserUseCase } from "../../../use-cases/auth/user/logOutUserUseCase";

const prismaUserRepository = new IPrimasUserRepository
const createUserUseCase = new CreateUserUseCase(prismaUserRepository)
const updateUserUseCase = new UpdateUserUseCase(prismaUserRepository)
const deleteUseCase = new DeleteUserUseCase(prismaUserRepository)
const readUseCase = new ReadUserUseCase(prismaUserRepository)
const findAllUseCase = new FindAllUserUseCase(prismaUserRepository)
const loginUserUseCase = new LoginUserUseCase(prismaUserRepository)
const logOutUserCase = new LogOutUserUseCase(prismaUserRepository)
const photoStorage = new LocalPhotoStorage
const multipartParser = new UserParseAndStoreMultipart(photoStorage)

export const userController = new UserController(
    multipartParser,
    createUserUseCase,
    updateUserUseCase,
    deleteUseCase,
    readUseCase,
    findAllUseCase,
    loginUserUseCase,
    logOutUserCase
)