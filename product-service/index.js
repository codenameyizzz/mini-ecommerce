const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;

app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 }
];

app.get('/products', (req, res) => {
  const html = `
    <div id="product-list" class="card">
      <button hx-get="http://localhost:3001/products" hx-target="#product-list" hx-swap="outerHTML">
        Reload Products
      </button>
      <ul id="product-list-content">
        ${products.map(product => `
          <li>
            ${product.name} - $${product.price}
          </li>
        `).join('')}
      </ul>
    </div>
  `;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});