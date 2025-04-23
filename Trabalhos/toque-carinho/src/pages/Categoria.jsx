import React from 'react'
import { useParams } from 'react-router-dom'
import { useCarrinho } from '../context/CarrinhoContext'

// Exemplo de produtos categorizados
const produtosPorCategoria = {
  canecas: [
    { id: 1, nome: 'Caneca Amor', preco: 29.9, imagem: '/caneca1.jpg' },
    { id: 2, nome: 'Caneca Café', preco: 24.9, imagem: '/caneca2.jpg' },
  ],
  garrafas: [
    { id: 3, nome: 'Garrafa Motivacional', preco: 39.9, imagem: '/garrafa1.jpg' },
    { id: 4, nome: 'Garrafa Neon', preco: 34.9, imagem: '/garrafa2.jpg' },
  ],
  agendas: [
    { id: 5, nome: 'Agenda 2025', preco: 45.0, imagem: '/agenda1.jpg' },
    { id: 6, nome: 'Agenda Floral', preco: 42.0, imagem: '/agenda2.jpg' },
  ],
  cadernetas: [
    { id: 7, nome: 'Caderneta Rosa', preco: 19.9, imagem: '/caderneta1.jpg' },
    { id: 8, nome: 'Caderneta Verde', preco: 21.9, imagem: '/caderneta2.jpg' },
  ],
}

function Categoria() {
  const { nome } = useParams()
  const produtos = produtosPorCategoria[nome] || []
  const { adicionarAoCarrinho } = useCarrinho()

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 capitalize">{nome}</h2>
      {produtos.length === 0 ? (
        <p>Categoria não encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produtos.map(produto => (
            <div key={produto.id} className="bg-white rounded-xl shadow-md p-4 text-center">
              <img src={produto.imagem} alt={produto.nome} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold">{produto.nome}</h3>
              <p className="text-pink-600 font-bold">R$ {produto.preco.toFixed(2)}</p>
              <button
                onClick={() => adicionarAoCarrinho(produto)}
                className="mt-3 bg-pink-500 hover:bg-pink-600 text-white py-1 px-4 rounded transition"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Categoria
