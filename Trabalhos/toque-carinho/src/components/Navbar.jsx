import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-pink-200 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-pink-800">Toque de Carinho</h1>
      <ul className="flex space-x-6 text-pink-800 font-medium">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/produtos">Produtos</Link>
        </li>
        <li>
          <Link to="/carrinho">Carrinho</Link>
        </li>
        <li>
          <Link to="/contato">Contato</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
