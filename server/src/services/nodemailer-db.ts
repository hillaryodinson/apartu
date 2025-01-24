import { Mail, PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import hbs from 'nodemailer-express-handlebars';

interface MailOptions {
    context: Record<string, any>,
    to: string, 
    subject: string, 
    template: string,  
    from: string
}

export class NodemailerDB {
    private _db;
    private _transporter;
    private _hbsOptions;

    constructor(db: PrismaClient) {
        this._db = db;
        this._transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            secure: false, // use SSL
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            }
        });

        this._hbsOptions = {
            viewEngine: {
                defaultLayout: 'template',
                layoutsDir:__dirname + '/../views/mails',
            },
            viewPath: __dirname + '/../views/mails',
        }
    }

    async dispatchMail(to: string, subject: string, template: string, context: string, from: string) {
        //prepare the mail to be sent
        await this._db.mail.create({
            data: {
                to,
                subject,
                content: JSON.stringify({
                    template,
                    context
                }),
                from
            }
        })
    }

    
    async sendMail(options: MailOptions) {
        try {
            this._transporter.use('compile', hbs(this._hbsOptions));
            //send the mail
            await this._transporter.sendMail(options, (err, info) => {
                if (err) {
                    console.log(err);
                }else{
                    console.log(info);}
            });
        } catch (error) {
            console.log(error)
        }
    }
}
