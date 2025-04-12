const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3002;

app.use(cors());
app.use(express.json());

const orders = [
  { id: 1, userId: 1, productId: 2, quantity: 1 },
  { id: 2, userId: 2, productId: 1, quantity: 2 }
];

app.get('/orders', (req, res) => {
  const html = `
    <div id="order-list" class="card">
      <button hx-get="http://localhost:3002/orders" hx-target="#order-list" hx-swap="outerHTML">
        Reload Orders
      </button>
      <ul id="order-list-content">
        ${orders.map(order => `
          <li>
            Order #${order.id} - User ID: ${order.userId}, Product ID: ${order.productId}, Quantity: ${order.quantity}
          </li>
        `).join('')}
      </ul>
    </div>
  `;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
