import express from 'express';
import {body} from 'express-validator';
import {getMe, postLogin} from '../controllers/auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';

const authRouter = express.Router();

authRouter
  // user login
  .post(
    '/login',
    body('username').trim().notEmpty(),
    body('password').trim().notEmpty(),
    validationErrorHandler,
    postLogin,
  )
  // get user info
  .get('/me', authenticateToken, getMe);

export default authRouter;