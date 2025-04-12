const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let orders = [
  { id: 1, userId: 1, productId: 2, quantity: 1 },
  { id: 2, userId: 2, productId: 1, quantity: 2 }
];

function renderOrders(res) {
  const html = `
    <div id="order-list" class="card">
      <form hx-post="http://localhost:3002/orders" hx-target="#order-list" hx-swap="outerHTML">
        <input type="number" name="userId" placeholder="User ID" required />
        <input type="number" name="productId" placeholder="Product ID" required />
        <input type="number" name="quantity" placeholder="Quantity" required />
        <button type="submit">Add Order</button>
      </form>
      <button hx-get="http://localhost:3002/orders" hx-target="#order-list" hx-swap="outerHTML">Reload Orders</button>
      <ul id="order-list-content">
        ${orders.map(o => `
          <li>
            Order #${o.id} — User ${o.userId}, Product ${o.productId}, Qty: ${o.quantity}
            <button hx-delete="http://localhost:3002/orders/${o.id}" hx-target="#order-list" hx-swap="outerHTML">❌</button>
          </li>`).join('')}
      </ul>
    </div>
  `;
  res.send(html);
}

app.get('/orders', (req, res) => renderOrders(res));

app.post('/orders', (req, res) => {
  const { userId, productId, quantity } = req.body;
  const id = orders.length + 1;
  orders.push({ id, userId: Number(userId), productId: Number(productId), quantity: Number(quantity) });
  renderOrders(res);
});

app.delete('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  orders = orders.filter(o => o.id !== id);
  renderOrders(res);
});

app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
