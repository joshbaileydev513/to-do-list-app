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
  user: 'root',         // Your database username
  password: 'Bailey716!', // Your database password
  database: 'to_do_list'  // Your database name
});

// Get all to-do items
app.get('/api/todos', (req, res) => {
  db.query('SELECT * FROM todo_items', (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// Add a new to-do item
app.post('/api/todos', (req, res) => {
  const { title, description } = req.body;
  db.query('INSERT INTO todo_items (title, description) VALUES (?, ?)', [title, description], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, title, description });
  });
});

// Update a to-do item's status
app.put('/api/todos/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  db.query('UPDATE todo_items SET status = ? WHERE id = ?', [status, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Status updated' });
  });
});

// Delete a to-do item
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM todo_items WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Item deleted' });
  });
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
