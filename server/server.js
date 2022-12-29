const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');

const pontoRouter = require('./routes/ponto')
const pontosRouter = require('./routes/pontos')

const { port } = require('./config')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/ponto', pontoRouter);
app.use('/api/pontos', pontosRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});

/**
 * [GET] Retorna um erro para rotas de API inexistentes.
 */
app.use((req, res) => {
  res.status(404);
});