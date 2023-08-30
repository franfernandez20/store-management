// server.js
import express, { json } from 'express';
import { addItem, getAllItems } from './BD.js';
import cors from 'cors';
const app = express();
const port = 3100;


app.use(json());

// Use the cors middleware
app.use(cors());

app.get('/data', (req, res) => {
  const items = getAllItems();
  res.json(items || []);
});

app.get('/data/:id', (req, res) => {
  const items = getAllItems();
  console.log('Request Id: ', req.params.id)
  const item = items.find(item => item.id === req.params.id);
  console.log('Item: ', item)
  res.json(item || {});
});


app.post('/data', (req, res) => {
  const newItem = req.body;
  console.log('Data: ', newItem)
  addItem(newItem);
  res.status(201).json(newItem);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});