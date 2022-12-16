import React from 'react'
import { useNavigate } from 'react-router-dom'
import EstadoDropDown from './EstadoDropDown'
import CidadeDropDown from './CidadeDropDown'
import travelLogo from '../assets/travel.png'
import './Detalhe.css'

export default function Detalhe(props) {
  const navigate = useNavigate()
  const [estadoAtual, setEstadoAtual] = React.useState('');
  const [cidadeAtual, setCidadeAtual] = React.useState('');

  function onEstadoChanged(estado) {
    setEstadoAtual(estado);
  }

  function onCidadeChanged(cidade) {
    setCidadeAtual(cidade);
  }

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
        <EstadoDropDown readOnly={props.readOnly} onChange={onEstadoChanged} estado={estadoAtual}  />
        <CidadeDropDown readOnly={props.readOnly} onChange={onCidadeChanged} estado={estadoAtual} cidade={cidadeAtual} />
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