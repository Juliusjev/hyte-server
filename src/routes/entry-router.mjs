import express from 'express';
import {
    listAllEntries,
    getEntryById,

} from '..controllers/entry-controller.mjs';
import { listAllEntries } from '../models/entry-model.mjs';



const entryRouter = express.Router();

// /entry endpoint
userRouter.route('/')
    // list all diary entries
    .get(listAllEntries)
    // get diary entry by id
    .get(getEntryById)




export default entryRouter;

