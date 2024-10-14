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

  // Check if title and description are provided
  if (!title || !description) {
    return res.status(400).send({ message: 'Title and description are required' });
  }

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



// Update a to-do item (title, description, due date, due time, and status)
app.put('/api/todos/:id', (req, res) => {
  const { title, description, status, dueDate, dueTime } = req.body;
  const { id } = req.params;

  // Check if required fields are provided
  if (!title || !description) {
    return res.status(400).send({ message: 'Title and description are required' });
  }

  // Update the to-do item in the database
  db.query(
    'UPDATE items SET title = ?, description = ?, status = ?, due_date = ?, due_time = ? WHERE id = ?',
    [title, description, status, dueDate, dueTime, id],
    (err) => {
      if (err) {
        console.error('Error updating data:', err);  // Log SQL error, if any
        return res.status(500).send(err);
      }
      res.send({ message: 'Todo updated successfully' });
    }
  );
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
