// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

app.get('/users', (req, res) => {
  const html = `
    <div id="user-list" class="card">
      <button hx-get="http://localhost:3000/users" hx-target="#user-list" hx-swap="outerHTML">
        Reload Users
      </button>
      <ul id="user-list-content">
        ${users.map(user => `<li>${user.name}</li>`).join('')}
      </ul>
    </div>
  `;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
