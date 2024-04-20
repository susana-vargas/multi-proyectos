const dogsRouter = require('express').Router()

let dogs = [
  {id: 1, name: 'mila', age: 5},
  {id: 2, name: 'diaval', age: 8},
  {id: 3, name: 'salem', age: 3},
  {id: 4, name: 'billie', age: 6},
  {id: 5, name: 'cancer', age: 1},
  {id: 6, name: 'rango', age: 2},
  {id: 7, name: 'mailo', age: 2},
];

const generateId = () => {
  const maxId = dogs.length > 0
    ? Math.max(...dogs.map(d => d.id))
    : 0
  return maxId + 1
}

dogsRouter.get('/', (req, res) => {
  res.json(dogs)
});

dogsRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const dog = dogs.find((dog) => dog.id === id)

  if (dog) {
    res.json(dog)
  } else {
    res.status(404).end()
  }

});

dogsRouter.post('/', (req,res) => {
  const body = req.body;

  if (!body.name || !body.age) {
    return res.status(400).json({error: 'nombre y edad son necesarios'})
  }

  const newDog = {
    id: generateId(),
    name: body.name,
    age: body.age,
  }

  dogs = dogs.concat(newDog)
  res.json(newDog)
});

dogsRouter.put('/:id', (req,res) => {
  const id = Number(req.params.id);
  const dogIndex = dogs.findIndex((dog)=> dog.id === id);
  if (dogIndex === -1) {
    res.status(404).send('perro no encontrado')
    return
  }
  const updatedDog = { ...dogs[dogIndex], ...req.body };
  dogs[dogIndex] = updatedDog;
  res.json(updatedDog);
});

dogsRouter.delete('/:id', (req,res) => {
  const id = Number(req.params.id)
  dogs = dogs.filter(dog => dog.id !== id)

    res.status(204).end()
});

module.exports = dogsRouter;