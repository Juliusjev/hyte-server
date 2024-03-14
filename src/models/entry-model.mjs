// Note: db functions are async and must be called with await from the controller
import promisePool from '../utils/database.mjs';

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const listAllEntriesByUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM DiaryEntries WHERE user_id = ?';
    const params = [id]
    const [rows] = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id, userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE entry_id = ? AND user_id = ?',
      [id, userId],
    );
    // console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};


const addEntry = async (entry, userId) => {
  const sql = `INSERT INTO DiaryEntries
               (user_id, entry_date, mood, weight, sleep_hours, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    userId,
    entry.entry_date,
    entry.mood,
    entry.weight,
    entry.sleep_hours,
    entry.notes,
  ];
  try {
    const rows = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};


const updateEntryById = async (entryId, userId, entryData) => {
  console.log(entryData);
  const fieldsToUpdate = Object.keys(entryData).map(key => `${key}=?`).join(', ');
  const values = [...Object.values(entryData), entryId, userId];
  const sql = `UPDATE DiaryEntries SET ${fieldsToUpdate} WHERE entry_id = ? AND user_id = ?`;

  try {
    const [result] = await promisePool.query(sql, values);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Entry not found or no permission to edit'};
    }
    return {message: 'Entry updated successfully', entry_id: entryId};
  } catch (error) {
    console.error('Error updating entry:', error);
    return {error: 500, message: 'Database error during entry update'};
  }
};

const deleteEntryById = async (id, userId) => {
  try {
    const sql = 'DELETE FROM DiaryEntries WHERE entry_id=? AND user_id=?';
    const params = [id, userId];
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Entry not found'};
    }
    return {message: 'Entry deleted', entry_id: id};
  } catch (error) {
    console.error('deleteEntryById', error);
    return {error: 500, message: 'db error'};
  }
};


export {
  listAllEntries,
  listAllEntriesByUserId,
  findEntryById,
  addEntry,
  updateEntryById,
  deleteEntryById,
};