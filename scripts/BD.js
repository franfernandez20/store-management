// db.js
const items = [];

function getAllItems() {
  return items;
}

function addItem(item) {
  items.push(item);
}

export {
  getAllItems,
  addItem,
};