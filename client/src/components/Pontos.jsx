import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import Inicio from './Inicio'
import Ponto from './Ponto'
import './Pontos.css'

function makePontos(count = 5) {
  const cristo_redentor = {
    nome: "Cristo Redentor",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    referencia: "Morro do Corcovado",
    descricao: 
      "Cristo Redentor é uma estátua art déco que retrata Jesus Cristo, " +
      "localizada no topo do morro do Corcovado, a 709 metros acima do nível do mar, " + 
      "com vista para parte considerável da cidade brasileira do Rio de Janeiro. " +
      "Feito de concreto armado e pedra-sabão, tem trinta metros de altura " + 
      "(uma das maiores estátuas do mundo), sem contar os oito metros do pedestal. " +
      "Seus braços se esticam por 28 metros de largura e a estrutura pesa 1145 toneladas."
  };

  const pontos = [];

  while (count--)
    pontos.push(cristo_redentor);

  return pontos;
}

/// Fake an HTTPS request for now.
function queryPontos(termo) {
  if (termo === ':teste')
    return makePontos();
  else
    return [];
}

export default function Pontos() {
  const [searchParams, setSearchParams] = useSearchParams()

  const termo = searchParams.get('busca')
  const pontos = queryPontos(termo)
  const pontoElementos = pontos.map(
    ponto => <Ponto key={nanoid()} {...ponto} />
  )
  
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