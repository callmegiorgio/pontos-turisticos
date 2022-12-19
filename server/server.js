require('dotenv').config();

const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const db         = require('./database');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});

/**
 * [POST] Cria um ponto turístico.
 */
app.post('/api/ponto', (req, res, next) => {
  let error_msg = null;

  if (!req.body.nome) {
    error_msg = 'Nome não informado';
  }
  else if (!req.body.cidade) {
    error_msg = 'Cidade não informada';
  }
  else if (!req.body.estado) {
    error_msg = 'Estado não informado';
  }
  else if (!req.body.referencia) {
    error_msg = 'Referência não informada';
  }
  else if (!req.body.descricao) {
    error_msg = 'Descrição não informada';
  }

  if (error_msg !== null) {
    res.status(400).json({error: error_msg});
    return;
  }

  const data = {
    nome:       req.body.nome,
    cidade:     req.body.cidade,
    estado:     req.body.estado,
    referencia: req.body.referencia,
    descricao:  req.body.descricao
  };

  db.criarPontoTuristico(data, (error, id) => {
    if (error) {
      res.status(400).json({error: error.message});
      return;
    }

    res.json({
      message: 'success',
      data: data,
      id: id
    });
  });
});

/**
 * [GET] Obtem todos os pontos turísticos, em ordem descrente pela data de inserção.
 */
app.get('/api/pontos/', (req, res, next) => {
  db.obterPontosTuristicos((error, rows) => {
    if (error) {
      res.status(400).json({'error': error.message});
      return;
    }
    
    res.json({
      'message': 'success',
      'data': rows
    });
  })
});

/**
 * [GET] Obtem todos os pontos turísticos que combinam com um termo,
 * em ordem descrente pela data de inserção.
 * 
 * Um ponto turístico combina com um termo se esse termo estiver contido
 * no nome, descrição, ou referência desse ponto turístico.
 */
app.get('/api/pontos/:termo', (req, res, next) => {
  db.obterPontosTuristicosPorTermo(req.params.termo, (error, rows) => {
    if (error) {
      res.status(400).json({'error': error.message});
      return;
    }
    
    res.json({
      'message': 'success',
      'data': rows
    });
  })
});

/**
 * [GET] Retorna um erro para rotas de API inexistentes.
 */
app.use((req, res) => {
  res.status(404);
});