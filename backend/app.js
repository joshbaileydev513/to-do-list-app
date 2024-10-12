const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

// Use CORS to allow communication with the Angular frontend
app.use(cors());
app.use(express.json());

// Create a connection to the MariaDB database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,              
    user: 'root',            
    password: 'Bailey716!', 
    database: 'to_do_list'    
  });
  

// Get all to-do items
app.get('/api/todos', (req, res) => {
  db.query('SELECT * FROM items', (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// Add a new to-do item
app.post('/api/todos', (req, res) => {
  // Extract data from the request body
  const { title, description, status = 'pending', dueDate, dueTime } = req.body;

  // Add console log to debug the data received from the front-end
  console.log('Received data:', { title, description, status, dueDate, dueTime });

  // Check if title and description are provided
  if (!title || !description) {
    return res.status(400).send({ message: 'Title and description are required' });
  }

  // Add console log to debug what data will be inserted into the database
  console.log('Data to be inserted:', [title, description, status, dueDate, dueTime]);

  // Insert the new to-do item into the database
  db.query(
    'INSERT INTO items (title, description, status, due_date, due_time) VALUES (?, ?, ?, ?, ?)',
    [title, description, status, dueDate, dueTime],
    (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);  // Log SQL error, if any
        return res.status(500).send(err);
      }

      // Return the newly created to-do item
      res.send({
        id: result.insertId,
        title,
        description,
        status,
        dueDate,
        dueTime
      });
    }
  );
});



// Update a to-do item's status
app.put('/api/todos/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  db.query('UPDATE items SET status = ? WHERE id = ?', [status, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Status updated' });
  });
});

// Delete a to-do item
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM items WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Item deleted' });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
