import dotenv from 'dotenv'
dotenv.config()

export const config = {
    passwordMongoDb : process.env.PASSWORD,
    clientIdGithub: process.env.CLIENT_ID_GITHUB,
    clientSecretGithub: process.env.CLIENT_SECRET_GITHUB,
    clientIdGoogle :process.env.CLIENT_ID_GOOGLE,
    clientSecretGoogle : process.env.CLIENT_SECRET_GOOGLE
}