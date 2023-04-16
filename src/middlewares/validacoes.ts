import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const validarCamposBody = (joiSchema: ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await joiSchema.validateAsync(req.body);
        next();
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

export {
    validarCamposBody
}