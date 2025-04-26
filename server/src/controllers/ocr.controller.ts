import { Request, Response, NextFunction } from "express";
import { extractText } from "../utils/ocr";
import multer from "multer";
import { extractBackData, extractFrontData } from "../utils/extractData";


interface MulterRequest extends Request {
    files: {
        front?: Express.Multer.File[],
        back?: Express.Multer.File[]
    }
}

export default async function (req: Request, res: Response, next: NextFunction) {
    console.log('its here in controller ');

    try {
        const reqTyped = req as MulterRequest
        if (!reqTyped.files || !reqTyped.files?.front || !reqTyped.files?.back) {
            return res.status(400).json({ message: 'Both front and back images are required' })
        }
        // console.log(req.files, ' - - -- - req.fiels - - - ');
        console.log(reqTyped.files.back[0]);

        const ocrFrontdData = await extractText(reqTyped.files.front[0].path)
        const resultFront = extractFrontData(ocrFrontdData.text)
        // console.log(result,'result -  - - - ');
        if (!resultFront) {
            return res.status(400).json({ message: 'Uploaded document is not a valid Aadhaar front side' });
        }

        const ocrBakData = await extractText(reqTyped.files.back[0].path)
        const resultBack = extractBackData(ocrBakData.text)
        console.log(resultBack, 'result back ');
        if (!resultBack) {
            return res.status(400).json({ message: 'Uploaded document is not a valid Aadhar back side' })
        }

        res.json({ data: { ...resultFront, ...resultBack } })
        console.log(' - - - - - - - - - -  - ');

        return
    } catch (error) {
        res.status(500).json({ message: 'OCR process failed', error: error })
        return
    }

}