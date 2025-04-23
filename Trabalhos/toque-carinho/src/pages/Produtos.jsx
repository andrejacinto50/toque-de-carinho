import React, { useContext, useEffect, useState } from 'react'
import { CarrinhoContext } from '../context/CarrinhoContext'

const listaProdutos = [
  { id: 1, nome: 'Kit Presente 1', preco: 49.9 },
  { id: 2, nome: 'Sabonete Artesanal', preco: 15.0 },
  { id: 3, nome: 'Caixa Toque Carinho', preco: 89.9 }
]

const Produtos = () => {
  const { adicionarAoCarrinho } = useContext(CarrinhoContext)
  const [produtosAdicionados, setProdutosAdicionados] = useState([])

  useEffect(() => {
    const dados = localStorage.getItem('produtos')
    if (dados) {
      const porCategoria = JSON.parse(dados)
      const todos = Object.values(porCategoria).flat()
      setProdutosAdicionados(todos)
    }
  }, [])


  // Junta os produtos fixos com os do painel admin
  const todosProdutos = [...listaProdutos, ...produtosAdicionados]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Produtos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {todosProdutos.map((produto, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            {produto.imagem && (
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="h-40 w-full object-cover rounded mb-2"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{produto.nome}</h3>
            <p className="mb-2">R$ {parseFloat(produto.preco).toFixed(2)}</p>
            <button
              onClick={() => adicionarAoCarrinho(produto)}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Produtos
