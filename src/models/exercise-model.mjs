import promisePool from "../utils/database.mjs";

const listAllExercises = async (id) => {
    const sql = 'SELECT * FROM Exercises WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    if (rows.length === 0) {
        return {error: 404, message: 'no exercises found'};
    }
    return rows;
}

const addExercise = async (exercise, userId) => {
    const sql = `INSERT INTO Exercises
                 (user_id, type, duration, intensity, date)
                 VALUES(?, ?, ?, ?, ?)`;
    const params = [
        userId,
        exercise.type,
        exercise.duration,
        exercise.intensity,
        exercise.date
    ];
    try {
        const rows = await promisePool.query(sql, params);
        return {exercise_id: rows[0].insertId};
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};


const deleteExerciseById = async (id, userId) => {
    try {
        const sql = 'DELETE FROM Exercises WHERE exercise_id=? AND user_id=?'
        const params = [id, userId];
        const [result] = await promisePool.query(sql, params);
        if (result.affectedRows === 0) {
            return {error: 404, message: 'Exercise not found'};
        }
        return {message: 'Exercise deleted', exercise_id: id};
    } catch (error) {
        console.error('deleteExerciseById', error);
        return {error: 500, message: 'db error'};
    }
};

const updateExerciseyById = async (exerciseId, userId, exerciseData) => {
    const fieldsToUpdate = Object.keys(exerciseData).map(key => `${key}=?`).join(', ');
    const values = [...Object.values(exerciseData), exerciseId, userId];
    const sql = `UPDATE Exercises SET ${fieldsToUpdate} WHERE exercise_id = ? AND user_id =?`;

    try {
        const [result] = await promisePool.query(sql, values);
        if (result.affectedRows === 0) {
            return {error: 404, message: 'Entry not found or no permission to edit'};
        }
        return {message: 'Exercise updadet succesfully', exercise_id: exerciseId};
    } catch (error) {
        console.error('Error updating exercise:', error);
        return {error: 500, message: 'Database error during exercise update'};
    }
};

export {
    listAllExercises,
    addExercise,
    deleteExerciseById,
    updateExerciseyById
}