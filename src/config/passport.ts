import { Response } from 'express';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User, { IUser } from '../models/user.model';
import HttpError from './error';

passport.use('local', new LocalStrategy((username, password, done) => {
    User.findOne({ name: username }, (err, user: IUser) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        user.checkPassword(password, (success) => {
            if (success) {
                return done(null, user);
            }

            return done(null, false);
        });
    });
}));

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    console.log('Deserializing user', id);
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

export default class Authorization {
    public static login(req, res: Response, next) {
        if (!req.account) {
            return next(new HttpError(401));
        }
        req.login(req.account, (err) => {
            if (err) {
                return next(new HttpError(500));
            }
            return res.sendStatus(204);
        });
    }

    public static any(req, res, next) {
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            return next();
        }

        res.sendStatus(401);
    }
}
