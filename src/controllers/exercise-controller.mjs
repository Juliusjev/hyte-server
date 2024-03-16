import bcrypt from 'bcryptjs';
import { customError } from '../middlewares/error-handler.mjs';
import { addExercise, deleteExerciseById, listAllExercises, updateExerciseyById } from '../models/exercise-model.mjs';


const getExercises = async (req, res, next) => {
    const result = await listAllExercises(req.params.id);
    if (result.error) {
        return next(customError(result, result.error));
    }
    return res.json(result);
};

const postExercise = async (req, res, next) => {
    const userId = req.user.user_id;
    const result = await addExercise(req.body, userId)
    if (result.exercise_id) {
        res.status(201);
        res.json({message: 'New exercise added.', ...result});
    } else {
        next(new Error(result.error));
    }
};

const deleteExercise = async (req, res, next) => {
    const result = await deleteExerciseById(req.params.id, req.user.user_id);
    if (result.error) {
        return next(customError(result.message, result.error));
    }
    return res.json(result);
};

const putExercise = async (req, res, next) => {
    const exerciseId = req.params.id;
    const userId = req.user.user_id;
    const exerciseData = {
        type: req.body.type,
        duration: req.body.duration,
        intensity: req.body.intensity,
        date: req.body.date
    };
    const result = await updateExerciseyById(exerciseId, userId, exerciseData);
    if (result.error) {
        return next(customError(result.message, result.error));
    }
    return res.status(201).json(result);
};


export {getExercises, postExercise, deleteExercise, putExercise}; 