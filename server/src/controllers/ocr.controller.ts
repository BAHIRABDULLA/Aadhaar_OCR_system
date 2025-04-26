import { Request, Response, NextFunction } from "express";
import { extractText } from "../utils/ocr";
import { extractBackData, extractFrontData } from "../utils/extractData";
import fs from 'fs';



interface MulterRequest extends Request {
    files: {
        front?: Express.Multer.File[],
        back?: Express.Multer.File[]
    }
}

export default async function (req: Request, res: Response, next: NextFunction) {

    try {
        const reqTyped = req as MulterRequest
        if (!reqTyped.files || !reqTyped.files?.front || !reqTyped.files?.back) {
            return res.status(400).json({ message: 'Both front and back images are required' })
        }

        const ocrFrontdData = await extractText(reqTyped.files.front[0].path)
        const resultFront = extractFrontData(ocrFrontdData.text)
        if (!resultFront) {
            return res.status(400).json({ message: 'Uploaded document is not a valid Aadhaar front side' });
        }

        const ocrBakData = await extractText(reqTyped.files.back[0].path)
        const resultBack = extractBackData(ocrBakData.text)
        if (!resultBack) {
            return res.status(400).json({ message: 'Uploaded document is not a valid Aadhar back side' })
        }
        fs.unlink(reqTyped.files.front[0].path, (err) => {
            if (err) console.error('Error deleting front image:', err);
        })
        fs.unlink(reqTyped.files.back[0].path, (err) => {
            if (err) console.error('Error deleting back image:', err);
        });

        res.json({ data: { ...resultFront, ...resultBack } })

        return
    } catch (error) {
        res.status(500).json({ message: 'OCR process failed', error: error })
        return
    }

}