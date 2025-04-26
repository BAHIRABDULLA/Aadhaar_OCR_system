import express from 'express'
const app = express()
import ocrRoute from './routes/ocr.routes'
import cors from 'cors'

const corsOption = {
    origin:'http://localhost:5173',
    credential:true
}
app.use(cors(corsOption))

app.use('/',ocrRoute)

app.listen(3000,()=>console.log('server listening on http://localhost:3000'))