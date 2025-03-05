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
          <Route path='main' element={<PrivateRoute requiredRole={['normal']}><Main/></PrivateRoute>}/>
          <Route path='registrar-cuenta' element={<Register/>}/>
          <Route path='loguear-cuenta' element={<Loguear/>}/>
          <Route path='pedidos-personalizados' element={<PrivateRoute requiredRole={['suscriptor']}><Pedidos/></PrivateRoute>}/>
          <Route path='/perfil/:user_id' element={<PrivateRoute requiredRole={['suscriptor','admin']}><Perfil/></PrivateRoute>}/>
          <Route path='Listado' element={<PrivateRoute requiredRole={['admin']}><ListaPerfiles/></PrivateRoute>}/> 
          <Route path='Inicio' element={<PrivateRoute requiredRole={['suscriptor','admin']}><Inicio/></PrivateRoute>}/>
          <Route path='search-users' element={<PrivateRoute requiredRole={['admin']}><BuscadorInteligente/></PrivateRoute>}/>
          <Route path='Usuarios' element={<PrivateRoute requiredRole={['admin']}><ListaUsuarios/></PrivateRoute>}/> 
          <Route/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
