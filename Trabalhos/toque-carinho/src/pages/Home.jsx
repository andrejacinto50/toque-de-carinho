import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import bannerPadrao from '../assets/artesanato.png'
import canecas from '../assets/caneca.jpg'
import garrafas from '../assets/garravas.jpg'
import agendas from '../assets/agendas.jpg'
import cadernetas from '../assets/caderneta.jpg'
import destaque from '../assets/deseee.jpg'

function Home() {
  const [banner, setBanner] = useState('')

  useEffect(() => {
    const imagemSalva = localStorage.getItem('bannerURL')
    if (imagemSalva) {
      setBanner(imagemSalva)
    }
  }, [])

  return (
    <div>
      {/* Banner principal (dinâmico ou padrão) */}
      <div className="relative">
        <img
          src={banner || bannerPadrao}
          alt="Banner"
          className="w-full h-[400px] object-cover rounded-lg shadow"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Toque de Carinho</h1>
          <p className="text-lg mt-2">Produtos personalizados com amor</p>
          <Link
            to="/produtos"
            className="mt-4 bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded text-white font-semibold transition"
          >
            Ver Produtos
          </Link>
        </div>
      </div>

      <section className="categorias mt-10 px-6">
  <h2 className="text-2xl font-bold text-pink-600 mb-4">Categorias</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {(() => {
      const categoriasSalvas = localStorage.getItem('categorias')
      const categorias = categoriasSalvas
        ? JSON.parse(categoriasSalvas)
        : [
            { nome: 'Canecas', imagem: canecas },
            { nome: 'Garrafas', imagem: garrafas },
            { nome: 'Agendas', imagem: agendas },
            { nome: 'Cadernetas', imagem: cadernetas },
          ]

      return categorias.map((cat, index) => (
        <Link key={index} to={`/categorias/${cat.nome.toLowerCase()}`}>
          <img
            src={cat.imagem || canecas}
            alt={cat.nome}
            className="rounded-lg shadow-md h-40 object-cover w-full"
          />
          <p className="text-center mt-2 font-medium">{cat.nome}</p>
        </Link>
      ))
    })()}
  </div>
</section>


  {/* Seção: Depoimentos (dinâmicos do localStorage) */}
<section className="mt-12 px-6">
  <h2 className="text-2xl font-bold text-pink-600 mb-6">Depoimentos de Clientes</h2>

  {(() => {
    const dados = localStorage.getItem('depoimentos')
    const depoimentos = dados ? JSON.parse(dados) : [
      { texto: 'Amei minha agenda personalizada! Entrega rápida e qualidade incrível.', autor: 'Juliana R.' },
      { texto: 'Comprei várias canecas para o escritório, todos adoraram. Super recomendo!', autor: 'Marcos P.' },
      { texto: 'A personalização ficou perfeita, exatamente como pedi. Obrigada!', autor: 'Renata S.' }
    ]

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {depoimentos.map((dep, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-4">
            <p className="italic">"{dep.texto}"</p>
            <p className="mt-2 font-semibold text-right">– {dep.autor}</p>
          </div>
        ))}
      </div>
    )
  })()}
</section>

 {/* Seção: Destaque do Mês (dinâmico com preço) */}
<section className="mt-12 px-6 pb-12">
  <h2 className="text-2xl font-bold text-pink-600 mb-6">Destaque do Mês</h2>

  {(() => {
    const imagem = localStorage.getItem('destaqueImagem')
    const titulo = localStorage.getItem('destaqueTitulo') || 'Produto em destaque'
    const descricao = localStorage.getItem('destaqueDescricao') || 'Aproveite nossa promoção especial!'
    const link = localStorage.getItem('destaqueLink') || '/produtos'
    const preco = localStorage.getItem('destaquePreco') || ''

    return (
      <div className="bg-pink-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow">
        {imagem && (
          <img src={imagem} alt="Produto em destaque" className="w-full md:w-1/3 rounded-xl shadow" />
        )}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-pink-700">{titulo}</h3>
          <p className="mt-2 text-gray-700">{descricao}</p>
          {preco && <p className="text-lg text-pink-600 font-semibold mt-2">R$ {parseFloat(preco).toFixed(2)}</p>}
          <Link
            to={link}
            className="inline-block mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded"
          >
            Ver produto
          </Link>
        </div>
      </div>
    )
  })()}
</section>


    </div>
  )
}

export default Home