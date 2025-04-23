import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Produtos from './pages/Produtos'
import Carrinho from './pages/Carrinho'
import Admin from './pages/Admin'
import CategoriaDetalhes from './pages/CategoriaDetalhes'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/categorias/:nome" element={<CategoriaDetalhes />} />
      </Routes>
    </>
  )
}

export default App
