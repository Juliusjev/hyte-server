import {listAllEntries, findEntryById, addEntry, updateEntryById, deleteEntryById} from "../models/entry-model.mjs";

const getEntries = async (req, res) => {
  const result = await listAllEntries();
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getEntryById = async (req, res) => {
  const Entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res) => {
  const {title, description, user_id} = req.body;
  if (filename && title && user_id) {
    const result = await addEntry({filename, size, mimetype, title, description, user_id});
    if (result.entry_id) {
      res.status(201);
      res.json({message: 'New entry added.', ...result});
    }
    else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);  
  }
};

const putEntry = async (req, res) => {
    const entry_id = req.params.id;
    const {notes, mood} = req.body;
    if (notes && mood) {
        const result = await updateEntryById({entry_id, ...req.body});
        if (result.error) {
            return res.status(result.error).json(result);
        }
        return res.status(201).json(result);
    } else {
        return res.status(400).json({error: 400, message: 'bad request'});
    }
};

const deleteEntry = async (req, res) => {
    const result = await deleteEntryById(req.params.id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};