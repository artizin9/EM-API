import { FastifyContextDTO } from "../../../dto/fastifyContextDTO";
import { LogOutUserUseCase } from "../../../use-cases/auth/user/logOutUserUseCase"; 
import { LoginUserUseCase } from "../../../use-cases/auth/user/loginUserUseCase";
import { CreateUserUseCase } from "../../../use-cases/user/createUseCase";
import { DeleteUserUseCase } from "../../../use-cases/user/deleteUseCase";
import { FindAllUserUseCase } from "../../../use-cases/user/findAllUseCase";
import { ReadUserUseCase } from "../../../use-cases/user/readUseCase";
import { UpdateUserUseCase } from "../../../use-cases/user/updateUseCase";
import { UserParseAndStoreMultipart } from "../helper/adapts/userParseAndStoreMultipart";

export class UserController {
  constructor(
    private multipart: UserParseAndStoreMultipart,
    private createUseCase: CreateUserUseCase,
    private updateUseCase: UpdateUserUseCase,
    private deleteUseCase: DeleteUserUseCase,
    private readUseCase: ReadUserUseCase,
    private findAll: FindAllUserUseCase,
    private LoginUseCase: LoginUserUseCase,
    private LogOutUseCase: LogOutUserUseCase
  ) {}

  async create(fastify: FastifyContextDTO) {
    const parsedData = await this.multipart.handle(fastify.req, {
      fileRequired: false,
      mode: "create",
    });
    const user = await this.createUseCase.execute(parsedData);
    fastify.res
      .status(201)
      .send({ message: "User criado com sucesso", ...user });
  }

  async update(fastify: FastifyContextDTO) {
    const { id } = fastify.req.params as { id: string };
    const parsedData = await this.multipart.handle(fastify.req, {
      fileRequired: false,
      mode: "update",
    });
    const user = await this.updateUseCase.execute(parsedData, id);
    fastify.res.send({ message: "User atualizado com sucesso", ...user });
  }

  async delete(fastify: FastifyContextDTO) {
    const { id } = fastify.req.params as { id: string };
    const user = await this.deleteUseCase.execute(id);
    fastify.res.send({ message: "User deletado com sucesso", user });
  }

  async read(fastify: FastifyContextDTO) {
    const { id } = fastify.req.params as { id: string };
    const user = await this.readUseCase.execute(id);
    fastify.res.send({ user });
  }

  async findAllUsers(fastify: FastifyContextDTO) {
    const users = await this.findAll.execute();
    fastify.res.send({ users });
  }

  async Login(fastify: FastifyContextDTO) {
    const { email, password } = fastify.req.body as {
      email: string;
      password: string;
    };
    const user = await this.LoginUseCase.execute({ email, password });
    fastify.res.status(201).setCookie('token', user.token, {
      httpOnly: true,
      maxAge: 3600 * 24 * 7,
      path: '/user',
      secure: true,
      sameSite: 'strict',
    })
      .send({ message: "Login realizado com sucesso", name: user.name, email: user.email });
  }

  async logOut(fastify: FastifyContextDTO){
    const { id } = fastify.req.params as {id: string}
    await this.LogOutUseCase.execute(id);
    fastify.res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/user',
      secure: true
    }).send({message: "LogOut realizado com sucesso"})
  }
}
