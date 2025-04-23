// src/components/ProductCard.jsx
import React from 'react'

function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-pink-600 font-bold">R$ {product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  )
}

export default ProductCard
