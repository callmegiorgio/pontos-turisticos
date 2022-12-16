import React from 'react';
import { nanoid } from 'nanoid';

export default function EstadoDropDown(props) {
  // Array de estados como siglas (SP, RJ, etc.)
  const [estados, setEstados] = React.useState([]);

  const estadoElementos = estados.map(
    estado => (
      <option key={nanoid()} value={estado}>
        {estado}
      </option>
    )
  );

  React.useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(res => res.json())
      .then(arr => {
        const siglaEstados = arr.map(estado => estado.sigla).sort();
        setEstados(siglaEstados);
        props.onChange(siglaEstados[0]);
      });
  }, []);

  return (
    <select disabled={props.readOnly} value={props.estado} onChange={(event) => props.onChange(event.target.value)}>
      {estadoElementos}
    </select>
  );
}