const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ajay123@',
    database: 'test',
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// mark attendance
app.post('/markAttendance', (req, res) => {
    const { date, attendance } = req.body;

    attendance.forEach((entry) => {
        const { studentName, status } = entry;
        const sql = 'INSERT INTO attendance (date, studentName, status) VALUES (?, ?, ?)';
        db.query(sql, [date, studentName, status], (err, result) => {
            if (err) throw err;
            console.log('Attendance marked');

        
        });
    });

    res.sendStatus(200);
});

// Route to fetch attendance for a specific date
app.get('/fetchAttendance', (req, res) => {
    const { date } = req.query;
    const sql = `
        SELECT studentName,
               SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) AS presentCount,
               COUNT(*) AS totalCount
        FROM attendance
        WHERE date <= ?
        GROUP BY studentName
    `;
    
    db.query(sql, [date], (err, results) => {
        if (err) throw err;
        
        const attendanceReport = results.map((entry) => {
            const studentName = entry.studentName;
            const presentCount = entry.presentCount;
            const totalCount = entry.totalCount;
            const percentage = Math.floor((presentCount / totalCount) * 100);
            
            return { studentName, percentage };
        });
        
        res.json(attendanceReport);
    });
});

// search attendance for a specific date
app.get('/searchAttendance', (req, res) => {
    const { date } = req.query;
    const sql = 'SELECT studentName, status FROM attendance WHERE date = ?';
    db.query(sql, [date], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});
