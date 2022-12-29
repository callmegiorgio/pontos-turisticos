const express = require('express');
const router = express.Router();
const db = require('../services/database')

/**
 * [GET] Obtem todos os pontos turísticos, em ordem descrente pela data de inserção.
 */
router.get('/', async (req, res, next) => {
  try {
    const pontos = await db.obterPontosTuristicos();
    
    res.json({
      'message': 'success',
      'data': pontos
    });
  }
  catch (err) {
    res.status(400).json({'error': err.message});
  }
});

/**
 * [GET] Obtem todos os pontos turísticos que combinam com um termo,
 * em ordem descrente pela data de inserção.
 * 
 * Um ponto turístico combina com um termo se esse termo estiver contido
 * no nome, descrição, ou referência desse ponto turístico.
 */
router.get('/:termo', async (req, res, next) => {
  try {
    const pontos = await db.obterPontosTuristicosPorTermo(req.params.termo);

    res.json({
      'message': 'success',
      'data': pontos
    });
  }
  catch (err) {
    res.status(400).json({'error': err.message});
  }
});

module.exports = router;