// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

// Staattinen sivusto palvelimen juureen (public-kansion sisältö näkyy osositteessa http://127.0.0.1:3000/sivu.html)
app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Staattinen sivusto "ali-url-osoitteessa http://127.0.0.1:3000/sivusto"
// Tarjoiltava kansio määritellään relatiivisella polulla
app.use('/sivusto', express.static(path.join(__dirname, '../public')));


// mock data for simple API
const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
  {id: 3, name: 'Item3'},
  {id: 4, name: 'Item4'},
];

// GET http://127.0.0.1:3000/items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET http://127.0.0.1:3000/items/<ID>
app.get('/items/:id', (req, res) => {
  // TODO: palauta vain se objekti, jonka on id vastaa pyydettyä
  console.log('requested item id', req.params.id);
  let item = 'tämän tilalle oikea objekti';
  res.json(item);
});

// Itemin lisäys
// POST http://127.0.0.1:3000/items
app.post('/items', (req, res) => {
  res.json({message: 'item created'});
});

// GET http://127.0.0.1:3000
// ei toimi tällä hetkellä, koska public-server tarjoilee index.html ennen tätä
app.get('/', (req, res) => {
  // TODO (vapaaehtoinen, jatketaan tästä ensi kerralla): lisää postattu item items-taulukkoon
  res.send('Welcome to my REST api!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
