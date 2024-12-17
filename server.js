const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
const port =5500;

// Middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',  // Your MySQL password
  database: 'credentials'
});

// Connect to MySQL database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// POST route to handle Sign-Up form submission
app.post('/submit_signup', (req, res) => {
  const { username, password } = req.body;

  // Hash the password before saving it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;

    // Insert the user into the database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        res.status(500).send('Error during sign-up');
        return;
      }
      res.send('User signed up successfully');
    });
  });
});

// POST route to handle Login form submission
app.post('/submit_login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the database
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const user = results[0];
      
      // Compare the entered password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) throw err;

        if (match) {
          res.send('Login successful');
        } else {
          res.send('Invalid username or password');
        }
      });
    } else {
      res.send('Invalid username or password');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
