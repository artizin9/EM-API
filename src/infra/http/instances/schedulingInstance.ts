import { CreateSchedulingUseCase } from "../../../use-cases/scheduling/createUseCase";
import { DeleteSchedulingUseCase } from "../../../use-cases/scheduling/deleteUseCase";
import { FindAllSchedulingUseCase } from "../../../use-cases/scheduling/findAllUseCase";
import { ReadSchedulingUseCase } from "../../../use-cases/scheduling/readUseCase";
import { UpdateSchedulingUseCase } from "../../../use-cases/scheduling/updateUseCase";
import { IPrismaSchedulingRepository } from "../../database/IPrismaSchedulingRepository";
import { IPrismaTimeRepository } from "../../database/IPrismaTimeRepository";
import { IPrimasUserRepository } from "../../database/IPrismaUserRepository";
import { SchedulingController } from "../controllers/schedulingController";

const prismaSchedulingRepository = new IPrismaSchedulingRepository();
const prismaUserRepository = new IPrimasUserRepository();
const prismaTimeRepository = new IPrismaTimeRepository();
const createScheduling = new CreateSchedulingUseCase(prismaSchedulingRepository, prismaUserRepository, prismaTimeRepository);
const updateScheduling = new UpdateSchedulingUseCase(prismaSchedulingRepository, prismaUserRepository, prismaTimeRepository);
const deleteScheduling = new DeleteSchedulingUseCase(prismaSchedulingRepository);
const readScheduling = new ReadSchedulingUseCase(prismaSchedulingRepository);
const findAllScheduling = new FindAllSchedulingUseCase(prismaSchedulingRepository);


export const schedulingController = new SchedulingController(
    createScheduling,
    updateScheduling,
    deleteScheduling,
    readScheduling,
    findAllScheduling,
);