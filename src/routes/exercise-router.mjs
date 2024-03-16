import express from 'express';
import {body, param} from 'express-validator';
import { deleteExercise, getExercises, postExercise, putExercise } from '../controllers/exercise-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';
import { validationErrorHandler } from '../middlewares/error-handler.mjs';

const exerciseRouter = express.Router();

exerciseRouter
    .route('/')
    .post (
        authenticateToken,
        postExercise,
    )


exerciseRouter
    .route('/:id')
    .get(
        authenticateToken,
        getExercises
    )
    .put(
        authenticateToken,
        validationErrorHandler,
        putExercise
    )
    .delete(
        authenticateToken,
        param('id', 'must be integer').isInt(),
        validationErrorHandler,
        deleteExercise
    );





export default exerciseRouter;