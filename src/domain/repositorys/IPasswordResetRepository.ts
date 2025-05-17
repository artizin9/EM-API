export interface IPasswordResetRepository {
    generateToken(): Promise<string>
    createResetLinkToken(email: string, token: string): Promise<string>
    validateResetLinkToken(token: string): Promise<boolean>
    invalidateResetLinkToken(token: string): Promise<void>
    applyRatelimit(email: string, ip: string): Promise<void>
    sendPasswordRecoveryEmail(email: string, resetLink: string): Promise<void>
    getEmailByToken(token: string): Promise<string | null>;

}