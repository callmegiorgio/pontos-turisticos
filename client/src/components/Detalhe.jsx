import React from 'react'
import { useNavigate } from 'react-router-dom'
import travelLogo from '../assets/travel.png'
import './Detalhe.css'

export default function Detalhe(props) {
  const navigate = useNavigate()

  function cadastrar() {
    console.log('cadastrar')
  }

  return (
    <div className='detalhe'>
      <img src={travelLogo} className='detalhe-logo' />
      <p className='bold'>Nome:</p>
      <input className='detalhe-right' type='text' readOnly={props.readOnly} />
      <p className='detalhe-localizacao bold'>Localização:</p>
      <p>UF/Cidade:</p>
      <div className='detalhe-estado'>
        <select disabled={props.readOnly}>
          <option value="sp">SP</option>
          <option value="rj">RJ</option>
          <option value="sc">SC</option>
          <option value="pa">PA</option>
        </select>
        <input type='text' readOnly={props.readOnly} />
      </div>
      <p>Referência:</p>
      <input className='detalhe-right' type='text' readOnly={props.readOnly} />
      <p className='bold'>Descrição:</p>
      <textarea className='detalhe-right' readOnly={props.readOnly} />
      <button className='detalhe-voltar' onClick={() => navigate(-1)}>voltar</button>
      {!props.readOnly && <button className='detalhe-cadastrar' onClick={cadastrar}>cadastrar</button>}
    </div>
  )
}