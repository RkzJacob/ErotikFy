import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './Pages/Register'
import { Loguear } from './Pages/Loguear'
import { Main } from './Pages/Main'
import { Pedidos } from './Pages/Pedidos'
import { MiAgenda } from './Pages/MiAgenda'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='main' element={<Main/>}/>
          <Route path='registrar-cuenta' element={<Register/>}/>
          <Route path='loguear-cuenta' element={<Loguear/>}/>
          <Route path='pedidos-personalizados' element={<Pedidos/>}/>
          <Route path='loguear-cuenta' element={<Loguear/>}/>
          <Route path='mi-agenda' element={<MiAgenda/>}/>
          <Route/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
