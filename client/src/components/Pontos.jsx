import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import Inicio from './Inicio'
import Ponto from './Ponto'
import serverUrl from '../serverUrl'
import './Pontos.css'

export default function Pontos() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [pontos, setPontos] = React.useState([]);

  const termo = searchParams.get('busca')

  const pontoElementos = pontos.map(
    ponto => <Ponto key={nanoid()} {...ponto} />
  )

  React.useEffect(() => {
    fetch(serverUrl() + `/api/pontos/${termo}`)
    .then(res => res.json())
    .then(res => {
      if (res.message === 'success')
        setPontos(res.data);
    });
  }, [termo]);
  
  return (
    <div className='pontos'>
      <Inicio termo={termo} />
      {
        pontoElementos.length > 0
        ?
        <div className='pontos-lista'>{pontoElementos}</div>
        :
        <h3 className='pontos-nenhum'>Não encontrei nenhum resultado para a sua busca :(</h3>
      }
    </div>
  )
}