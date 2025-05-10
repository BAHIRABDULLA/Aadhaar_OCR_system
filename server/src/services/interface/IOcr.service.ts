import { MulterRequest } from "../../controllers/implimentation/ocr.controller";
import { ExtractDataResponse } from "../implementtion/ocr.service";

export interface IOcrService {
    extractData(reqTyped:MulterRequest):Promise<ExtractDataResponse>
}   