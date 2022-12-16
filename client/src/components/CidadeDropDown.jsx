import React from 'react';
import { nanoid } from 'nanoid';

export default function CidadeDropDown(props) {
  const [cidades, setCidades] = React.useState([]);

  const cidadeElementos = cidades.map(
    cidade => <option key={nanoid()} value={cidade}>{cidade}</option>
  );

  React.useEffect(() => {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${props.estado}/municipios`)
      .then(res => res.json())
      .then(arr => {
        const nomeCidades = arr.map(municipio => municipio.nome).sort();
        
        setCidades(nomeCidades);

        if (!nomeCidades.includes(props.cidade))
          props.onChange(nomeCidades[0]);
      });
  }, [props.estado]);

  return (
    <select disabled={props.readOnly} value={props.cidade} onChange={event => props.onChange(event.target.value)}>
      {cidadeElementos}
    </select>
  );
}