import express from 'express'
const app = express()
import ocrRoute from './routes/ocr.routes'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const corsOption = {
    origin:process.env.CLIENT_BASE_URL,
    credential:true
}
app.use(cors(corsOption))

app.use('/',ocrRoute)

app.listen(3000,()=>console.log('server listening on http://localhost:3000'))