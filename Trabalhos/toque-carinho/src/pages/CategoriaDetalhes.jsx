import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCarrinho } from '../context/CarrinhoContext'

const dadosCategorias = {
  canecas: [
    { id: 1, nome: 'Caneca Rosa', preco: 25, imagem: '/assets/caneca.jpg' },
    { id: 2, nome: 'Caneca Personalizada', preco: 30, imagem: '/imagens/caneca2.jpg' },
  ],
  garrafas: [
    { id: 3, nome: 'Garrafa Térmica Azul', preco: 40, imagem: '/imagens/garrafa1.jpg' },
    { id: 4, nome: 'Garrafa Personalizada', preco: 45, imagem: '/imagens/garrafa2.jpg' },
  ],
  agendas: [
    { id: 5, nome: 'Agenda 2025', preco: 35, imagem: '/imagens/agenda1.jpg' },
    { id: 6, nome: 'Agenda Floral', preco: 38, imagem: '/imagens/agenda2.jpg' },
  ],
  cadernetas: [
    { id: 7, nome: 'Caderneta P', preco: 20, imagem: '/imagens/caderneta1.jpg' },
    { id: 8, nome: 'Caderneta M', preco: 25, imagem: '/imagens/caderneta2.jpg' },
  ],
}

const CategoriaDetalhes = () => {
  const { nome } = useParams()
  const { adicionarAoCarrinho } = useCarrinho()
  const [produtosAdmin, setProdutosAdmin] = useState([])

  // Buscar produtos salvos no localStorage para a categoria
  useEffect(() => {
    const dados = localStorage.getItem('produtos')
    if (dados) {
      const produtosPorCategoria = JSON.parse(dados)
      const categoriaNormalizada = nome.charAt(0).toUpperCase() + nome.slice(1)
      const lista = produtosPorCategoria[categoriaNormalizada] || []
      setProdutosAdmin(lista)
    }
  }, [nome])

  // Combina produtos fixos + produtos adicionados via admin
  const produtos = [...(dadosCategorias[nome] || []), ...produtosAdmin]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        {nome.charAt(0).toUpperCase() + nome.slice(1)}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((produto, index) => (
          <div key={index} className="bg-white rounded shadow p-4">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{produto.nome}</h3>
            <p className="text-pink-600 font-bold mb-2">R$ {produto.preco},00</p>
            <button
              onClick={() => adicionarAoCarrinho(produto)}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriaDetalhes
