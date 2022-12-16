import React      from 'react'
import { Link }   from 'react-router-dom';
import travelLogo from '../assets/travel.png'
import './Inicio.css'

export default function Inicio(props) {
    const [termo, setTermo] = React.useState(props.termo || '');

    function handleChange(event) {
        setTermo(event.target.value);
    }

    return (
        <div className='inicio'>
            <img className='inicio-logo' src={travelLogo}/>
            <div className='inicio-cadastrar'>
                <Link to='/pontos/novo'><button>cadastrar um ponto turístico</button></Link>
            </div>
            <input
                className='inicio-ponto'
                type='text'
                placeholder='Digite um termo para buscar um ponto turístico...'
                value={termo}
                onChange={handleChange}
            />
            <Link to={{
                pathname: '/pontos',
                search: `?busca=${termo}`
            }}>
                <button disabled={termo.length === 0}>buscar</button>
            </Link>
        </div>
    );
}