import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import EstadoDropDown from './EstadoDropDown'
import CidadeDropDown from './CidadeDropDown'
import travelLogo from '../assets/travel.png'
import './Detalhe.css'

export default function Detalhe(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [estado, setEstado] = React.useState(location.state?.estado || '');
  const [cidade, setCidade] = React.useState(location.state?.cidade || '');

  function onEstadoChanged(estado) {
    setEstado(estado);
  }

  function onCidadeChanged(cidade) {
    setCidade(cidade);
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
        <EstadoDropDown readOnly={props.readOnly} onChange={onEstadoChanged} estado={estado}  />
        <CidadeDropDown readOnly={props.readOnly} onChange={onCidadeChanged} estado={estado} cidade={cidade} />
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