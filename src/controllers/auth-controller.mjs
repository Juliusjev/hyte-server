import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { selectUserByUsername } from "../models/user-model.mjs";
import 'dotenv/config';
import { customError } from '../middlewares/error-handler.mjs';

// INSECURE LOGIN uses harcoded passwords only
// returns user object if username & password match
const postLogin = async (req, res) => {
    const {username, password} = req.body;
    console.log('login', req.body);
    const user = await selectUserByUsername(username);
    if (user.error) {
      return res.status(user.error).json(user);
    }
    // TODO: compare password and hash, if match, login succesful
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        delete user.password;
        const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '24h'});
        return res.json({message: 'logged in successfully', user, token});
    } else {
        return next(customError('Invalid username or password', 401));
    }
  };

  const getMe = async (req, res) => {
    res.json({user: req.user});
  };


  export {postLogin, getMe};