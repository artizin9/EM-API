export interface PhotoStorageProvider{
    save(file: {
        filename: string,
        buffer: Buffer,
        mimetype: string
    }): Promise<string>
}