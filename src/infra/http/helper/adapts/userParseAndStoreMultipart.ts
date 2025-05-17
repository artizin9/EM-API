import { FastifyRequest } from "fastify";
import { PhotoStorageProvider } from "../../../../domain/providers/IPhotoStorageProvider";
import { updateUserDTO, updateUserSchema, userDTO, userSchema, } from "../../../schemas/user.schema";
import { ServerError } from "../../../../shared/serverError";

export class UserParseAndStoreMultipart {
  constructor(private photoStorage: PhotoStorageProvider) {}

  async handle(
    req: FastifyRequest,
    options: { fileRequired?: boolean; mode: "create" }
  ): Promise<userDTO & { photoURL?: string }>;
  
  async handle(
    req: FastifyRequest,
    options: { fileRequired?: boolean; mode: "update" }
  ): Promise<updateUserDTO & { photoURL?: string }>;
  
  async handle(
    req: FastifyRequest,
    options: { fileRequired?: boolean; mode: "create" | "update" }
  ): Promise<(userDTO | updateUserDTO) & { photoURL?: string }> {
    const rawFields: any = {};
    let photoURL: string | undefined;
    let hasFile = false;
  
    const parts = req.parts();
  
    for await (const part of parts) {
      if (part.type === "file") {
        hasFile = true;
        if (part.filename) {
          const buffer = await part.toBuffer();
          photoURL = await this.photoStorage.save({
            buffer,
            filename: part.filename,
            mimetype: part.mimetype,
          });
        }
      } else if (part.type === "field") {
        rawFields[part.fieldname] = part.value;
      }
    }
  
    if (options?.fileRequired && !hasFile) {
      throw new ServerError("Arquivo não enviado");
    }
  
    const schema = options.mode === "update" ? updateUserSchema : userSchema;
    const parsedData = schema.safeParse(rawFields);
    if (!parsedData.success) throw new ServerError("Campos inválidos");
  
    return {
      ...parsedData.data,
      photoURL,
    };
  }
}
