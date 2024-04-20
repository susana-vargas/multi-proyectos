const express = require('express');
const app = express();
app.use(express.json());

const catsRouter = require('./controllers/cats-router');

app.use('/api/cats', catsRouter)
// app.get('/', (req, res) => {
//   res.send('ok');
// })


app.listen(3000, () => {
  console.log('escuchando en el puerto 3000');
})
