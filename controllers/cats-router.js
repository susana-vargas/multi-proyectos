const catsRouter = require('express').Router()

let cats = [
  {id: 1, name: 'bebe ganjah', age: 5},
  {id: 2, name: 'bebe nieves', age: 8},
  {id: 3, name: 'manitas', age: 3},
  {id: 4, name: 'pinki', age: 6},
  {id: 5, name: 'caricias', age: 1},
  {id: 6, name: 'cashi', age: 2},
  {id: 7, name: 'gandalf', age: 2},
];

const generateId = () => {
  const maxId = cats.length > 0
    ? Math.max(...cats.map(c => c.id))
    : 0
  return maxId + 1
}

catsRouter.get('/', (req, res) => {
  res.json(cats)
});

catsRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const cat = cats.find((cat) => cat.id === id)

  if (cat) {
    res.json(cat)
  } else {
    res.status(404).end()
  }

});

catsRouter.post('/', (req,res) => {
  const body = req.body;

  if (!body.name || !body.age) {
    return res.status(400).json({error: 'nombre y edad son necesarios'})
  }

  const newCat = {
    id: generateId(),
    name: body.name,
    age: body.age,
  }

  cats = cats.concat(newCat)
  res.json(newCat)
});

catsRouter.put('/:id', (req,res) => {
  const id = Number(req.params.id);
  const catIndex = cats.findIndex((cat)=> cat.id === id);
  if (catIndex === -1) {
    res.status(404).send('gato no encontrado')
    return
  }
  const updatedCat = { ...cats[catIndex], ...req.body };
  cats[catIndex] = updatedCat;
  res.json(updatedCat);
});

catsRouter.delete('/:id', (req,res) => {
  const id = Number(req.params.id)
  cats = cats.filter(cat => cat.id !== id)

    res.status(204).end()
});


module.exports = catsRouter;