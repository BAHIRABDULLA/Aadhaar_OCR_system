import { Request,Response,NextFunction } from "express"

export interface IOcrController {
    extractData(req:Request,res:Response,next:NextFunction):Promise<void>
}