import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'products.json');

function readProducts() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeProducts(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method } = req;

  try {
    // GET — List all products
    if (method === 'GET') {
      const products = readProducts();
      return res.status(200).json(products);
    }

    // POST — Create a new product
    if (method === 'POST') {
      const products = readProducts();
      const body = req.body;

      const newProduct = {
        id: Date.now(),
        name: body.name || 'Untitled Product',
        category: body.category || 'Kurtis',
        price: Number(body.price) || 0,
        originalPrice: Number(body.originalPrice) || 0,
        discount: body.discount || '',
        rating: Number(body.rating) || 0,
        reviews: Number(body.reviews) || 0,
        tag: body.tag || '',
        sizes: body.sizes || [],
        image: body.image || '',
      };

      products.push(newProduct);
      writeProducts(products);

      return res.status(201).json(newProduct);
    }

    // PUT — Update a product by id
    if (method === 'PUT') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Missing product id in query params' });
      }

      const products = readProducts();
      const index = products.findIndex((p) => p.id === Number(id));

      if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const body = req.body;
      products[index] = {
        ...products[index],
        name: body.name ?? products[index].name,
        category: body.category ?? products[index].category,
        price: body.price !== undefined ? Number(body.price) : products[index].price,
        originalPrice: body.originalPrice !== undefined ? Number(body.originalPrice) : products[index].originalPrice,
        discount: body.discount ?? products[index].discount,
        rating: body.rating !== undefined ? Number(body.rating) : products[index].rating,
        reviews: body.reviews !== undefined ? Number(body.reviews) : products[index].reviews,
        tag: body.tag ?? products[index].tag,
        sizes: body.sizes ?? products[index].sizes,
        image: body.image ?? products[index].image,
      };

      writeProducts(products);
      return res.status(200).json(products[index]);
    }

    // DELETE — Remove a product by id
    if (method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Missing product id in query params' });
      }

      let products = readProducts();
      const filtered = products.filter((p) => p.id !== Number(id));

      if (filtered.length === products.length) {
        return res.status(404).json({ error: 'Product not found' });
      }

      writeProducts(filtered);
      return res.status(200).json({ success: true, deletedId: Number(id) });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
