const express = require('express');
const router = express.Router();
const db = require('../services/database')

/**
 * [POST] Cria um ponto turístico.
 */
router.post('/', async (req, res, next) => {
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

  const ponto = {
    nome:       req.body.nome,
    cidade:     req.body.cidade,
    estado:     req.body.estado,
    referencia: req.body.referencia,
    descricao:  req.body.descricao
  };
  
  try {
    const pontoID = await db.criarPontoTuristico(ponto);
    
    res.json({
      message: 'success',
      data: ponto,
      id: pontoID
    });
  }
  catch (err) {
    res.status(400).json({error: err.message});
  }
});

module.exports = router;