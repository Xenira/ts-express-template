import * as crypto from 'crypto';
import { Document, model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    index: true,
    type: String,
    unique: true,
  },
  password: String,
  salt: String,
});

// DONT use arrow functions here
// Arrow functions bind this and prevent you from accessing the document
// tslint:disable-next-line:only-arrow-functions
userSchema.methods.setPassword = function(password: string, cb: () => void) {
  this.salt = crypto.randomBytes(128).toString('base64');
  this.password = crypto.pbkdf2(password, this.salt, 100000, 64, 'sha512', (err, derivedKey) => {
    if (err) { throw err; }
    this.password = derivedKey.toString('hex');
    cb();
  });
};

userSchema.methods.checkPassword = function(password: string, cb: (success: boolean) => void) {
  crypto.pbkdf2(password, this.salt, 100000, 64, 'sha512', (err, derivedKey) => {
    if (err) { throw err; }
    cb(derivedKey.toString('hex') === this.password);
  });
};

export default model('User', userSchema);
export interface IUser extends Document {
  name: string;
  setPassword: (password: string, cb: () => void) => void;
  checkPassword: (password: string, cb: (success: boolean) => void) => void;
}
