import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import EstadoDropDown from './EstadoDropDown'
import CidadeDropDown from './CidadeDropDown'
import serverUrl  from '../serverUrl'
import travelLogo from '../assets/travel.png'
import './Detalhe.css'

function criarPontoVazio() {
  return {
    nome: '',
    estado: '',
    cidade: '',
    referencia: '',
    descricao: ''
  };
}

export default function Detalhe(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = React.useState(location.state || criarPontoVazio());

  function onEstadoChanged(estado) {
    setState(prevState => ({...prevState, estado: estado}));
  }

  function onCidadeChanged(cidade) {
    setState(prevState => ({...prevState, cidade: cidade}));
  }

  // Função invocada quando os outros atributos além de estado e cidade
  // são alterados, ou seja, 'nome', 'referencia' e 'descricao'.
  function onOutrosChanged(event) {
    const { name, value } = event.target;

    setState(prevState => ({...prevState, [name]: value}));
  }

  function cadastrar() {
    fetch(serverUrl() + '/api/ponto', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'success') {
        alert(`O ponto turístico '${state.nome}' foi cadastrado com sucesso!`);
        setState(criarPontoVazio());
      }
      else {
        alert('Falha ao cadastrar o ponto turístico: ' + data.error);
      }
    });
  }

  // O botão cadastrar só está ativado se para cada campo do ponto turístico
  // (nome, descrição, etc.), o campo não for uma string vazia.
  const cadastrarAtivado = Object.keys(state).every(key => state[key].length !== 0);

  return (
    <div className='detalhe'>
      <img src={travelLogo} className='detalhe-logo' />
      <p className='bold'>Nome:</p>
      <input
        className='detalhe-right'
        type='text'
        readOnly={props.readOnly}
        name='nome'
        value={state.nome}
        onChange={onOutrosChanged}
      />
      <p className='detalhe-localizacao bold'>Localização:</p>
      <p>UF/Cidade:</p>
      <div className='detalhe-estado'>
        <EstadoDropDown readOnly={props.readOnly} onChange={onEstadoChanged} estado={state.estado}  />
        <CidadeDropDown readOnly={props.readOnly} onChange={onCidadeChanged} estado={state.estado} cidade={state.cidade} />
      </div>
      <p>Referência:</p>
      <input
        className='detalhe-right'
        type='text'
        readOnly={props.readOnly}
        name='referencia'
        value={state.referencia}
        onChange={onOutrosChanged}
      />
      <p className='bold'>Descrição:</p>
      <textarea
        className='detalhe-right'
        readOnly={props.readOnly}
        name='descricao'
        value={state.descricao}
        onChange={onOutrosChanged}
      />
      <button className='detalhe-voltar' onClick={() => navigate(-1)}>voltar</button>
      {
        !props.readOnly &&
        <button
          className='detalhe-cadastrar'
          onClick={cadastrar}
          disabled={!cadastrarAtivado}
        >
          cadastrar
        </button>
      }
    </div>
  )
}