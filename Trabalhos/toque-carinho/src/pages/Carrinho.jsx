import React, { useContext } from 'react'
import { CarrinhoContext } from '../context/CarrinhoContext'

const Carrinho = () => {
  const { carrinho, removerDoCarrinho } = useContext(CarrinhoContext)

  const total = carrinho.reduce((soma, produto) => soma + produto.preco, 0)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Seu Carrinho</h2>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div className="space-y-4">
          {carrinho.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-semibold">{item.nome}</p>
                <p>R$ {item.preco.toFixed(2)}</p>
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => removerDoCarrinho(index)}
              >
                Remover
              </button>
            </div>
          ))}
          <div className="mt-4 font-bold text-lg">
            Total: R$ {total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  )
}

export default Carrinho
