import fs from 'fs';
import { IOcrService } from "../interface/IOcr.service";
import { extractText } from "../../utils/ocr";
import { extractBackData, extractFrontData } from "../../utils/extractData";

import { HttpStatus } from "../../constants/httpStatus";
import { RESPONSE_MESSAGES } from "../../constants/response.messages";
import CustomError from "../../utils/custom.error";
import { MulterRequest } from '../../controllers/implimentation/ocr.controller';


export interface FrontData {
    name: string;
    dob: string;
    gender: string
    aadhaarNumber: string
}

export interface BackData {
    address: string;
    pincode: string;
}

export interface ExtractDataResponse {
    data: FrontData & BackData;
}


export class OcrService implements IOcrService {
    async extractData(reqTyped: MulterRequest): Promise<ExtractDataResponse> {
        try {
            if (!reqTyped.files || !reqTyped.files?.front || !reqTyped.files?.back) {
                throw new CustomError(RESPONSE_MESSAGES.UPLOAD.REQUIRED, HttpStatus.BAD_REQUEST)
            }
            const ocrFrontdData = await extractText(reqTyped.files.front[0].path)
            const resultFront = extractFrontData(ocrFrontdData.text)
            if (!resultFront) {
                throw new CustomError(RESPONSE_MESSAGES.UPLOAD.NOT_VALID_FRONT_INPUT, HttpStatus.BAD_REQUEST)
            }

            const ocrBakData = await extractText(reqTyped.files.back[0].path)
            const resultBack = extractBackData(ocrBakData.text)
            if (!resultBack) {
                throw new CustomError(RESPONSE_MESSAGES.UPLOAD.NOT_VALID_BACK_INPUT, HttpStatus.BAD_REQUEST)
            }
            await fs.promises.unlink(reqTyped.files.front[0].path)
            await fs.promises.unlink(reqTyped.files.back[0].path)
            return { data: { ...resultFront, ...resultBack } }
        } catch (error) {
            throw error
        }

    }
}