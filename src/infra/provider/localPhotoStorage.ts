import { existsSync, mkdirSync} from "fs";
import { PhotoStorageProvider } from "../../domain/providers/IPhotoStorageProvider";
import { randomUUID } from "crypto";
import { join } from "path";
import { writeFile } from "fs/promises";

export class LocalPhotoStorage implements PhotoStorageProvider{
    private uploadDir = "upload";
    
    constructor(){
        if(!existsSync(this.uploadDir)) mkdirSync(this.uploadDir)
    }

    async save(file: { filename: string; buffer: Buffer; mimetype: string; }): Promise<string> {
        const uniqueName = `${randomUUID()}-${file.filename}`;
        const path = join(this.uploadDir, uniqueName);
        await writeFile(path, file.buffer);
        return `/uploads/${uniqueName}`
    }
}