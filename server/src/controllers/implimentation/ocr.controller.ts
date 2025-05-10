import { Request, Response, NextFunction } from "express";

import { HttpStatus } from "../../constants/httpStatus";
import { RESPONSE_MESSAGES } from "../../constants/response.messages";
import { IOcrController } from "../interface/IOcr.controller";
import { OcrService } from "../../services/implementtion/ocr.service";



export interface MulterRequest extends Request {
    files: {
        front?: Express.Multer.File[],
        back?: Express.Multer.File[]
    }
}


 class OcrController implements IOcrController {
    constructor(private ocrService:OcrService){   }
     async extractData(req: Request, res: Response, next: NextFunction) :Promise<void>{

        try {
            const reqTyped = req as MulterRequest
            
            const response = await this.ocrService.extractData(reqTyped)
            
            res.status(HttpStatus.OK).json(response)
            return
        } catch (error) {
           next(error)
        }
    }
}
export default OcrController