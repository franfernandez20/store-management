// db.js
let items = [];

function getAllItems() {
  return items;
}

function addItem(item) {
  items = [...items.filter(i => i.id !== item.id), item];
}

export {
  getAllItems,
  addItem,
};