const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;

app.use(cors());
app.use(express.json());
// Tambahkan ini agar bisa menangani form HTMX
app.use(express.urlencoded({ extended: true }));

// Data dummy
let products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 }
];

// Fungsi render HTML produk
function renderProducts(res) {
  const html = `
    <div id="product-list" class="card">
      <form hx-post="http://localhost:3001/products" hx-target="#product-list" hx-swap="outerHTML">
        <input type="text" name="name" placeholder="Product Name" required />
        <input type="number" name="price" placeholder="Price" required />
        <button type="submit">Add Product</button>
      </form>
      <button hx-get="http://localhost:3001/products" hx-target="#product-list" hx-swap="outerHTML">
        Reload Products
      </button>
      <ul id="product-list-content">
        ${products.map(p => `
          <li>
            ${p.name} - $${p.price}
            <button hx-delete="http://localhost:3001/products/${p.id}" hx-target="#product-list" hx-swap="outerHTML">❌</button>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
  res.send(html);
}

// GET
app.get('/products', (req, res) => renderProducts(res));

// POST
app.post('/products', (req, res) => {
  const { name, price } = req.body;
  const id = products.length + 1;
  products.push({ id, name, price: Number(price) });
  renderProducts(res);
});

// DELETE
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  renderProducts(res);
});

// Listen
app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});
