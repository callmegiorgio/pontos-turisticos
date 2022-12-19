import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import Inicio from './Inicio'
import Ponto from './Ponto'
import serverUrl from '../serverUrl'
import './Pontos.css'

const MAX_PONTOS_POR_PAGINA = 5;

export default function Pontos() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [pontos, setPontos] = React.useState([]);
  const [pagina, setPagina] = React.useState(0);

  const termo = searchParams.get('busca')

  const pontosNaPagina = pontos.slice(
    pagina * MAX_PONTOS_POR_PAGINA,
    (pagina + 1) * MAX_PONTOS_POR_PAGINA
  );

  const pontoElementos = pontosNaPagina.map(
    ponto => <Ponto key={nanoid()} {...ponto} />
  )

  function mudarPagina(direcao) {
    setPagina(prevPagina => prevPagina + direcao);
  }

  React.useEffect(() => {
    let url = serverUrl() + '/api/pontos/';

    if (termo !== null)
      url += termo;

    fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.message === 'success')
        setPontos(res.data);
    });
  }, [termo]);

  const possuiPaginaAnterior = pagina > 0;
  const possuiPaginaSeguinte = pagina < (Math.ceil(pontos.length / MAX_PONTOS_POR_PAGINA) - 1);
  
  return (
    <div className='pontos'>
      <Inicio termo={termo} />
      {
        pontoElementos.length > 0
        ?
        <div className='pontos-lista'>
          {pontoElementos}
          <div className='pontos-paginacao'>
            <button disabled={!possuiPaginaAnterior} onClick={() => mudarPagina(-1)}>Voltar</button>
            <button disabled={!possuiPaginaSeguinte} onClick={() => mudarPagina(+1)}>Avançar</button>
          </div>
        </div>
        :
        <h3 className='pontos-nenhum'>Não encontrei nenhum resultado para a sua busca :(</h3>
      }
    </div>
  )
}