import express from 'express'
const app = express()
import ocrRoute from './routes/ocr.routes'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.CLIENT_BASE_URL,'-- - - ');

app.use(cors({
    origin: [process.env.CLIENT_BASE_URL!],
    credentials:true
}))

app.use('/',ocrRoute)

app.listen(3000,()=>console.log('server listening on http://localhost:3000'))