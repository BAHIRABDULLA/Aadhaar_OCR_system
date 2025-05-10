import express from 'express'
import multer from 'multer'
// import ocrController from '../controllers/implimentation/ocr.controller'
import OcrController from '../controllers/implimentation/ocr.controller'
import { OcrService } from '../services/implementtion/ocr.service'
const ocrService = new OcrService()
const ocrController = new OcrController(ocrService)

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

router.post('/ocr-process', upload.fields([{ name: 'front' }, { name: 'back' }]),ocrController.extractData.bind(ocrController) )

export default router