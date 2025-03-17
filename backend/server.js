const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'farmers_data'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create farmers table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS farmers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produce VARCHAR(255) NOT NULL,
    amount_sold FLOAT NOT NULL,
    rate_sold FLOAT NOT NULL,
    male_workers INT NOT NULL,
    female_workers INT NOT NULL
  )
`;

connection.query(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Farmers table created or already exists');
  }
});

// API endpoint to submit data
app.post('/submit', (req, res) => {
  const { produce, amount_sold, rate_sold, male_workers, female_workers } = req.body;

  const query = `
    INSERT INTO farmers (produce, amount_sold, rate_sold, male_workers, female_workers)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(query, [produce, amount_sold, rate_sold, male_workers, female_workers], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Failed to submit data' });
    }
    res.json({ success: true });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "frontend" folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'farmers_data'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint to submit data
app.post('/submit', (req, res) => {
  const { produce, amount_sold, rate_sold, male_workers, female_workers } = req.body;

  const query = `
    INSERT INTO farmers (produce, amount_sold, rate_sold, male_workers, female_workers)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(query, [produce, amount_sold, rate_sold, male_workers, female_workers], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Failed to submit data' });
    }
    res.json({ success: true });
  });
});

// Serve the frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});