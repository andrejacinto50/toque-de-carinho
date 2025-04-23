import React from 'react'

const CardProduto = ({ produto }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <img src={produto.imagem} alt={produto.nome} className="w-full h-40 object-cover rounded mb-4" />
      <h3 className="text-lg font-bold">{produto.nome}</h3>
      <p className="text-pink-600 font-semibold text-lg">R$ {produto.preco.toFixed(2)}</p>
      <button className="mt-2 bg-pink-500 text-white px-4 py-2 rounded">Adicionar ao Carrinho</button>
    </div>
  )
}

export default CardProduto
