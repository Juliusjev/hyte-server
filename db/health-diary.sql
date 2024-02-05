-- Create database (drop the old one if it exists)
DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) NOT NULL DEFAULT 'regular'
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create a table for exercise log
CREATE TABLE ExerciseLog (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    type_of_exercise VARCHAR(100),
    duration FLOAT,
    -- intensity?
    calories_burned INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create a table for goals and progress
CREATE TABLE Goals (
    goal_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    start_date DATE,
    end_date DATE,
    goal_description VARCHAR(100),
    progress VARCHAR(100),
    goal_status VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- Inserting multiple user rows at once
INSERT INTO Users (username, password, email, user_level) VALUES
    ('johndoe', 'temp-pw-1', 'johndoe@example.com', 'regular'),
    ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
    ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');
    

-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2024-01-10 21:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 6, 'Busy day, a bit stressed out', '2024-01-10 21:00:00'),  
  (3, '2024-01-10', 'Stressed', 90.0, 7, 'Feeling overwhelmed', '2024-01-20 19:00:00'),  
  (3, '2024-01-17', 'Exhausted', 91.0, 5, 'Feeling burnt out', '2024-01-21 22:30:00'),
  (3, '2024-01-19', 'Exhausted', 91.0, 6, 'Feeling burnt out', '2024-01-23 22:30:00'),
  (1, '2024-01-12', 'Energetic', 70, 9, 'Slept well, feeling good', '2024-01-10 20:00:00');

-- Inserting exercise data
INSERT INTO ExerciseLog (user_id, entry_date, type_of_exercise, duration, calories_burned) VALUES
    (1, '2024-01-21', 'gym', 1.5, 350),
    (2, '2024-01-22', 'running', 1, 500),
    (3, '2024-01-23', 'cycling', 2.5, 600),
    (3, '2024-01-26', 'walking', 2, 400),
    (2, '2024-01-28', 'running', 2, 800),
    (1, '2024-01-27', 'gym', 2, 500);

-- Inserting goals
INSERT INTO Goals (user_id, start_date, end_date, goal_description, progress, goal_status) VALUES
    (1, '2024-01-10', '2024-02-10', 'lose 5kg of weight', 'lost 2kg', 'ongoing'),
    (2, '2024-01-12', '2024-03-12', 'get more energy', 'sleeping better', 'ongoing'),
    (3, '2024-01-14', '2024-02-14', 'knee rehab', 'knee bends a little better', 'ongoing');



-- Example queries
SELECT users.username, DiaryEntries.entry_date, DiaryEntries.mood, DiaryEntries.notes
FROM users, DiaryEntries
WHERE DiaryEntries.user_id = Users.user_id;

-- Same with JOIN
SELECT users.username, DiaryEntries.entry_date, DiaryEntries.mood, DiaryEntries.notes
FROM  Users
JOIN DiaryEntries ON DiaryEntries.user_id = Users.user_id;

-- Entries for specific username
SELECT entry_date, mood, sleep_hours FROM DiaryEntries 
JOIN Users ON DiaryEntries.user_id = Users.user_id
WHERE Users.username = 'johndoe';

-- Getting the total burned calories for a specific user
SELECT SUM(calories_burned) AS Total_calories_burned
FROM ExerciseLog
WHERE user_id = 1;

-- Getting the average hours of sleep for a specific user
SELECT AVG(sleep_hours) AS Average_sleep_hours
FROM DiaryEntries
WHERE user_id = 3;

-- List all exercises done by a user along with calories burned
SELECT entry_date, type_of_exercise, duration, calories_burned
FROM ExerciseLog
WHERE user_id = 2;

-- Show user's mood changes over the last month
SELECT entry_date, mood
FROM DiaryEntries
WHERE user_id = 1 AND entry_date BETWEEN DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH) AND CURRENT_DATE
ORDER BY entry_date;

-- Get the most recent entry for a specific user
SELECT *
FROM DiaryEntries
WHERE user_id = 1
ORDER BY entry_date DESC, created_at DESC
LIMIT 1;

-- Find entries where a specific user's mood was 'stressed' and sleep hours were less than 8
SELECT entry_date, mood, sleep_hours
FROM DiaryEntries
WHERE user_id = 2 AND mood = 'Stressed' AND sleep_hours < 8;


