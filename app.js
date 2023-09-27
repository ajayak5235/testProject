const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

// Configure MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'college',
    password: 'Ajay123@',
    database: 'mysql',
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Set up EJS for rendering HTML templates
app.set('view engine', 'ejs');

// Route to display the HTML form
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission and create the table
app.post('/create-table', (req, res) => {
    const tableName = req.body.tableName;

    // SQL query to create a table
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        age INT
    )`;

    // Execute the query
    db.query(createTableQuery, (err) => {
        if (err) {
            console.error(err);
            res.send('Error creating table.');
        } else {
            res.send('Table created successfully.');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
