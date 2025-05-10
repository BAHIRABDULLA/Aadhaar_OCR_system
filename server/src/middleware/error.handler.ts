import { Request, Response, NextFunction } from "express";
import { RESPONSE_MESSAGES } from "../constants/response.messages";

interface CustomError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    
    const statusCode = err.statusCode || 500;
    const message = err.message || RESPONSE_MESSAGES.COMMON.SERVER_ERROR;

    res.status(statusCode).json({
        message
    });
};

export default errorHandler;