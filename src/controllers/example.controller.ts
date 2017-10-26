import { NextFunction, Request, Response } from 'express';
 
 // GET: path/
 export const getFunction = function(req: Request, res: Response, next: NextFunction) {
    return res.sendStatus(418);
};

 // POST: path/
 export const postFunction = function(req: Request, res: Response, next: NextFunction) {
    return res.sendStatus(418);
 };

 // PUT: path/
 export const putFunction = function(req: Request, res: Response, next: NextFunction) {
    return res.sendStatus(418);
 };

 // DELETE: path/
 export const deleteFunction = function(req: Request, res: Response, next: NextFunction) {
    return res.sendStatus(418);
 };