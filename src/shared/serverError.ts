export class ServerError extends Error {
    constructor(public message: string, public statusCode: number = 400){
        super(message)
    }
}