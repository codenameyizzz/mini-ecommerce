const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname)); // Serve all static files (html, css, etc.)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => {
  console.log('Frontend running on http://localhost:8080');
});
