import { AvailableTimeUseCase } from "../../../use-cases/time/availableTimeUseCase";
import { TimeCreateUseCase } from "../../../use-cases/time/createUseCase";
import { DeleteTimeUseCase } from "../../../use-cases/time/deleteUseCase";
import { FindAllTimeUseCase } from "../../../use-cases/time/findAllUseCase";
import { ReadTimeUseCase } from "../../../use-cases/time/readUseCase";
import { UpdateTimeUseCase } from "../../../use-cases/time/updateUseCase";
import { IPrismaCorporationRepository } from "../../database/IPrismaCorporationRepository";
import { IPrismaTimeRepository } from "../../database/IPrismaTimeRepository";
import { TimeController } from "../controllers/timeController";

const prismaRepository = new IPrismaTimeRepository();
const corporationRepository = new IPrismaCorporationRepository();
const createTimeUseCase = new TimeCreateUseCase(prismaRepository, corporationRepository);
const readTimeUseCase = new ReadTimeUseCase(prismaRepository);
const deleteTimeUseCase = new DeleteTimeUseCase(prismaRepository);
const updateTimeUseCase = new UpdateTimeUseCase(prismaRepository, corporationRepository);
const findAllTimeUseCase = new FindAllTimeUseCase(prismaRepository);
const availableTimeUseCase = new AvailableTimeUseCase(prismaRepository);

export const timeController = new TimeController(
    createTimeUseCase,
    readTimeUseCase,
    deleteTimeUseCase,
    availableTimeUseCase,
    updateTimeUseCase,
    findAllTimeUseCase
)