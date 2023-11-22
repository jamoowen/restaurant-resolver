import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');



export async function POST(request: NextRequest) {
    const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
    const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
    // const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

    const data = await request.json()
    // const name = data.name;
    const targetEmail = data.email;
    const message = data.message;
    const today = new Date().toISOString().slice(0, 10)

    // const targetEmail = data.

    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        pool: true,
        port: 587,
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },

        auth: {

            user: username,
            pass: password
        }
    });

    try {

        const mail = await transporter.sendMail({
            from: username,
            to: targetEmail,
            subject: `Restaurant Resolver ${today}`,
            html: `
       
            <p>The fates have decided... <br/> 
            The chosen restaurant is: ${message} </p>`,
        })

        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(`erra-> ${error}`)
        return NextResponse.json({ message: `MESSAGE ERROR:${error}` }, { status: 500 })

    }


}