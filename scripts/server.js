// server.js
import express, { json } from 'express';
import { addItem, getAllItems } from './BD.js';
import cors from 'cors';
const app = express();
const port = 3100;


app.use(json());

// Use the cors middleware
app.use(cors());

app.get('/views', (req, res) => {
  const items = getAllItems();
  res.json(items);
});

app.post('/views', (req, res) => {
  const newItem = req.body;
  console.log('newItem: ', newItem)
  addItem(newItem.view);
  res.status(201).json(newItem.view);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});