import { FastifyRequest } from "fastify";
import { PhotoStorageProvider } from "../../../../domain/providers/IPhotoStorageProvider";
import { ServerError } from "../../../../shared/serverError";
import { CorporationDTO, corporationSchema, UpdateCorporationDTO, updateCorporationSchema } from "../../../schemas/corporation.schema";

export class CorporationParseAndStoreMultipart {
  constructor(private photoStorage: PhotoStorageProvider) {}

  async handle(
    req: FastifyRequest,
    options: { fileRequired?: boolean; mode: "create" }
  ): Promise<CorporationDTO & { photoURL?: string }>;
  
  async handle(
    req: FastifyRequest,
    options: { fileRequired?: boolean; mode: "update" }
  ): Promise<UpdateCorporationDTO & { photoURL?: string }>;
  
  async handle(
    req: FastifyRequest,
    options: { fileRequired?: boolean; mode: "create" | "update" }
  ): Promise<(CorporationDTO | UpdateCorporationDTO) & { photoURL?: string }> {
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
    console.log("rawFields:", rawFields);
    const schema = options.mode === "update" ? updateCorporationSchema : corporationSchema;
    const parsedData = schema.safeParse(rawFields);
    console.log(parsedData.success, parsedData.error?.format());
    if (!parsedData.success) throw new ServerError("Campos inválidos");
    
    return {
      ...parsedData.data,
      photoURL,
    };
  }
}
