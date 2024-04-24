const userRouter = require('express').Router();
// crea hash y compara
const bcrypt = require('bcrypt');
// crea token
const jwt = require('jsonwebtoken');
//importa las variables d eentorno
require('dotenv').config();


let users = [{ id: 1, name: 'chencho', password: '2009' }];

const generateId = () => {
  const maxId = users.length > 0
    ? Math.max(...users.map(u => u.id))
    : 0;
  return maxId + 1;
};

userRouter.get('/', (req, res) => {
  res.json(users);
});

userRouter.post('/', async (req,res) => {
  const body = req.body;

  if (!body.name || !body.password) {
    return res.status(400).json( { error: 'nombre y contraseña son necesarios' } );
  }
  const passwordHash = await bcrypt.hash(body.password, 10);
  console.log('passwordHash', passwordHash);

  const newUser = {
    id: generateId(),
    name: body.name,
    password: passwordHash,
  };

  users = users.concat(newUser);
  res.json(newUser);
});


userRouter.post('/login', async(req, res) => {
  const body = req.body;

  //se compara el nombre con el que de inicio sesión con los usuarios creados
  const user = users.find(user => user.name === body.name);

  if (!user) {
    return res.status(401).json({ error: 'Usuario no encontrado' });
  }

  //se compara la contraseña de inicio de sesión con las contraceñas encriptadas
  //cuando se registraron usuarios lo hace para verificar si es el usuario que
  //ya se avia registrado
  const passwordMatch = await bcrypt.compare(body.password, user.password);

  if (passwordMatch) {
    // si la contraseña es correcta
    const userForToken = {
      name: user.name,
      id: user.id,
    };
    // crea el token con id y nombre de usuario, y con ello el secreto
    const token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).send( { id: user.id, userName:user.name } );
    console.log('token creado', token);
    // res.json({ message: 'las contraseñas son iguales' });

  } else {
    res.status(401).json({ error: 'Contraseña incorrecta' });
  }

});

module.exports = userRouter;