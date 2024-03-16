import { customError } from '../middlewares/error-handler.mjs';
import {
    listAllEntries,
    findEntryById,
    addEntry,
    deleteEntryById,
    updateEntryById,
    listAllEntriesByUserId,
    selectTop5
  } from '../models/entry-model.mjs';
  
  const getEntries = async (req, res, next) => {
    // return only logged user's own entries
    // - get user's id from token (req.user.user_id)
    const result = await listAllEntriesByUserId(req.user.user_id);
    if (!result.error) {
      res.json(result);
    } else {
        next(new Error(result.error));
    }
  };
  
  const getEntryById = async (req, res, next) => {
    const entry = await findEntryById(req.params.id);
    if (entry) {
      res.json(entry);
    } else {
        next(customError('Entry not found', 404));
    }
  };
  
  const postEntry = async (req, res, next) => {
    const userId = req.user.user_id;
    const result = await addEntry(req.body, userId);
    if (result.entry_id) {
      res.status(201);
      res.json({message: 'New entry added.', ...result});
    } else {
      next(new Error(result.error));
    }
  };
  
  const putEntry = async (req, res, next) => {
    const entryId = req.params.id;
    const userId = req.user.user_id;
    const entryData = {
      entry_date: req.body.entry_date,
      mood: req.body.mood,
      weight: req.body.weight,
      sleep_hours: req.body.sleep_hours,
      notes: req.body.notes,
    };
    const result = await updateEntryById(entryId, userId, entryData);
    if (result.error) {
      return next(customError(result.message, result.error));
    }
    return res.status(201).json(result);
  };


const deleteEntry = async (req, res, next) => {
  const result = await deleteEntryById(req.params.id, req.user.user_id);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.json(result);
};

const getTop5 = async (req, res) => {
  const result = await selectTop5();
  return res.json(result)
}

  
  export {getEntries, getEntryById, postEntry, putEntry, deleteEntry, getTop5};