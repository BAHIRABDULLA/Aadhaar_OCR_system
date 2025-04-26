import express from 'express'
import multer from 'multer'
import ocrController from '../controllers/ocr.controller'


const upload = multer({dest:'uploads/'})

const router = express.Router()

router.post('/ocr-process',upload.fields([{name:'front'} , {name:'back'}]),ocrController )

export default router