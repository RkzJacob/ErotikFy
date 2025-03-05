import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './Pages/Register'
import { Loguear } from './Pages/Loguear'
import { Main } from './Pages/Main'
import { Pedidos } from './Pages/Pedidos'
import { Perfil } from './Pages/perfil'
import { ListaPerfiles } from './Pages/ListaPerfiles'
import { Inicio } from './Pages/Inicio'
import { BuscadorInteligente } from './Pages/Buscador'
import { ListaUsuarios } from './Pages/Usuarios'
import { PrivateRoute } from './Components/PrivateRoutes/privateRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Loguear/>}/>
          <Route path='main' element={<PrivateRoute><Main/></PrivateRoute>}/>
          <Route path='registrar-cuenta' element={<Register/>}/>
          <Route path='loguear-cuenta' element={<Loguear/>}/>
          <Route path='pedidos-personalizados' element={<PrivateRoute><Pedidos/></PrivateRoute>}/>
          <Route path='/perfil/:user_id' element={<PrivateRoute><Perfil/></PrivateRoute>}/>
          <Route path='Listado' element={<PrivateRoute><ListaPerfiles/></PrivateRoute>}/> 
          <Route path='Inicio' element={<PrivateRoute><Inicio/></PrivateRoute>}/>
          <Route path='search-users' element={<PrivateRoute><BuscadorInteligente/></PrivateRoute>}/>
          <Route path='Usuarios' element={<PrivateRoute><ListaUsuarios/></PrivateRoute>}/> 
          <Route/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
