import React from 'react'
import { Link } from 'react-router-dom'
import './Ponto.css'

export default function Ponto(props) {
  return (
    <div className='ponto'>
      <div className='ponto-cabecalho'>
        <h3 className='ponto-nome'>{props.nome}</h3>
        <p className='ponto-localizacao'>{props.cidade} - {props.estado}, {props.referencia}</p>
      </div>
      <p className='ponto-descricao'>{props.descricao}</p>
      <Link
        to='/pontos/exibir'
        state={props}
      >
        <button>ver detalhes</button>
      </Link>
    </div>
  )
}