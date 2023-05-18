const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Setup express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setup SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// Initialize database table
db.run('CREATE TABLE tasks(task text, done integer)', (err) => {
  if (err) {
    console.error(err.message);
  }
});

// API endpoint to get tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT rowid as id, task, done FROM tasks', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// API endpoint to add a task
app.post('/tasks', (req, res) => {
  db.run('INSERT INTO tasks(task, done) VALUES(?, ?)', [req.body.task, 0], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.json({id: this.lastID, task: req.body.task, done: 0});
  });
});

// API endpoint to update a task
app.put('/tasks/:id', (req, res) => {
  db.run('UPDATE tasks SET done = ? WHERE rowid = ?', [req.body.done, req.params.id], (err) => {
    if (err) {
      throw err;
    }
    res.json({id: req.params.id, task: req.body.task, done: req.body.done});
  });
});


// API endpoint to delete a task
app.delete('/tasks/:id', (req, res) => {
  db.run('DELETE FROM tasks WHERE rowid = ?', req.params.id, (err) => {
    if (err) {
      throw err;
    }
    res.json({deleted: true});
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000')
});
