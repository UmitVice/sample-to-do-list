const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Endpoint to get tasks
app.get('/api/tasks', (req, res) => {
  fs.readFile('', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading tasks: ', err);
      res.status(500).json({ error: 'Error reading tasks' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
