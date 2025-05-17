import nodemailer from 'nodemailer';
import { env } from '../../config/env';

export class SendEmailProvider {
    constructor(private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: env.GMAIL_USER,
            pass: env.PASSWORD_GMAIL,
        }}))
        {}
        
        async sendPasswordRecoveryEmail(data: {resetLink: string, email: string}) {
            const html = `
                    <h2>Recuperação de Senha</h2>
                    <p>Você solicitou a redefinição da sua senha.</p>
                    <p>Clique no link abaixo para criar uma nova senha:</p>
                    <a href="${data.resetLink}" target="_blank">${data.resetLink}</a>
                    <p>Se você não solicitou isso, ignore este e-mail.</p>`;
            
            await this.transporter.sendMail({
                from: "Suporte " + env.GMAIL_USER,
                to: data.email,
                subject: 'Recuperação de Senha',
                html: html,
            });
        }
        
}