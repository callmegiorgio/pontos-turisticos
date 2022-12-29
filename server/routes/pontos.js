const express = require('express');
const router = express.Router();
const db = require('../services/database')

/**
 * [GET] Obtem todos os pontos turísticos, em ordem descrente pela data de inserção.
 */
router.get('/', (req, res, next) => {
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
router.get('/:termo', (req, res, next) => {
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

module.exports = router;