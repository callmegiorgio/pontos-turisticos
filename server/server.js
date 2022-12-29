require('dotenv').config();

const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const db         = require('./services/database');

const pontoRouter = require('./routes/ponto')
const pontosRouter = require('./routes/pontos')

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/ponto', pontoRouter);
app.use('/api/pontos', pontosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});

/**
 * [GET] Retorna um erro para rotas de API inexistentes.
 */
app.use((req, res) => {
  res.status(404);
});