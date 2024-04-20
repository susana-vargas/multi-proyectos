const express = require('express');
const app = express();
app.use(express.json());

const dogsRouter = require('./controllers/dogs-router')

app.use('/api/dogs', dogsRouter)
// app.get('/', (req, res) => {
//   res.send('ok');
// })


app.listen(3001, () => {
  console.log('escuchando en el puerto 3001');
})
