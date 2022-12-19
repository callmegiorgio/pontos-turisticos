import React  from 'react'
import { Routes, Route } from 'react-router-dom'
import Pontos from './components/Pontos'
import Detalhe from './components/Detalhe'
import './App.css'

export default function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path='/'              element={<Pontos />} />
        <Route path='/pontos'        element={<Pontos />} />
        <Route path='/pontos/novo'   element={<Detalhe readOnly={false} />} />
        <Route path='/pontos/exibir' element={<Detalhe readOnly={true} />} />
      </Routes>
    </div>
  );
}