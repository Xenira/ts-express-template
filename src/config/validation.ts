import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import passport = require('passport');

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err: any = new Error();
        err.status = 422;
        err.errors = errors.array();
        return next(err);
    }
    next();
};
