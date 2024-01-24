import { json } from "body-parser";

// mock data for simple API
const items = [
  {id: 1, name: 'Koira'},
  {id: 2, name: 'Kissa'},
  {id: 3, name: 'Hevonen'},
  {id: 4, name: 'Virtahepo'},
];

const getItems = (req, res) => {
  res.json(items);
};


const getItemById = (req, res) => {
  // TODO: palauta vain se objekti, jonka on id vastaa pyydettyä
  // console.log('requested item id', req.params.id);
  const itemFound = items.find(item => {
    return item.id == req.params.id;
  });
  // console.log('found item', itemFound);
  // let item = items.find((item) => item.id === parseInt(req.params.id));
  if (itemFound) {
    res.json(itemFound);
  } else {
    res.status(404);
    res.json({error: 'not found'});
  }
};

const postItem = (req, res) => {
  res.json({message: 'item created'});
};

const deleteItem = (req, res) => {
  // TODO: implement delete item
  // tip: array.findIndex() ?
  res.json({message: 'delete placeholder'});
};

const putItem = (req, res) => {
  // TODO: implement modify item
  res.json({message: 'put placeholder'});
};


export {getItems, getItemById, postItem, deleteItem, putItem};

