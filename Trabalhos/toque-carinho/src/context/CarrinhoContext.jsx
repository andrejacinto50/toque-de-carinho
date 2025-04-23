import React, { createContext, useState, useContext } from 'react';



export const CarrinhoContext = createContext()

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([])

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto])
  }

  const removerDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho]
    novoCarrinho.splice(index, 1)
    setCarrinho(novoCarrinho)
  }

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinho = () => useContext(CarrinhoContext);
