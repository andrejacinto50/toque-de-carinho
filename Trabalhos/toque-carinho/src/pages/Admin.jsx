import React, { useState, useEffect } from 'react'


const abas = [
  'Banner',
  'Categorias',
  'Produtos',
  'Depoimentos',
  'Destaque do Mês',
  'Pagamentos'
]

const Admin = () => {
  const [senha, setSenha] = useState('')
  const [logado, setLogado] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState('Banner')

  const handleLogin = () => {
    if (senha === 'admin123') {
      setLogado(true)
    } else {
      alert('Senha incorreta')
    }
  }

  if (!logado) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Painel Admin</h2>
        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button onClick={handleLogin} className="bg-pink-500 text-white px-4 py-2 rounded">Entrar</button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Painel Admin</h2>

      {/* Abas */}
      <div className="flex space-x-2 mb-4">
        {abas.map((aba) => (
          <button
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            className={`px-3 py-1 rounded ${abaAtiva === aba ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}
          >
            {aba}
          </button>
        ))}
      </div>

      {/* Conteúdo da aba selecionada */}
      <div className="bg-white shadow rounded p-4">
        {abaAtiva === 'Banner' && <Banner />}
        {abaAtiva === 'Categorias' && <Categorias />}
        {abaAtiva === 'Produtos' && <Produtos />}
        {abaAtiva === 'Depoimentos' && <Depoimentos />}
        {abaAtiva === 'Destaque do Mês' && <Destaque />}
        {abaAtiva === 'Pagamentos' && <Pagamentos />}
      </div>
    </div>
  )
}

// Componentes (vão melhorar aos poucos)
const Banner = () => {
  const [imagem, setImagem] = useState(null)
  const [preview, setPreview] = useState(() => {
    return localStorage.getItem('bannerURL') || ''
  })

  const handleImagemChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
      setImagem(file)
    }
  }

  const salvarImagem = () => {
    if (preview) {
      localStorage.setItem('bannerURL', preview)
      alert('Imagem do banner salva com sucesso!')
    }
  }

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Alterar imagem do banner</h3>

      <input type="file" accept="image/*" onChange={handleImagemChange} className="mb-4" />

      {preview && (
        <div className="mb-4">
          <p className="text-sm mb-2">Pré-visualização:</p>
          <img src={preview} alt="Preview Banner" className="max-w-full h-48 object-cover rounded" />
        </div>
      )}

      <button
        onClick={salvarImagem}
        className="bg-pink-500 text-white px-4 py-2 rounded"
      >
        Salvar Banner
      </button>
    </div>
  )
}

const categoriasIniciais = [
  { nome: 'Canecas', imagem: '' },
  { nome: 'Garrafas', imagem: '' },
  { nome: 'Agendas', imagem: '' },
  { nome: 'Cadernetas', imagem: '' },
]

const Categorias = () => {
  const [categorias, setCategorias] = useState(() => {
    const salvas = localStorage.getItem('categorias')
    return salvas ? JSON.parse(salvas) : categoriasIniciais
  })

  const handleImagem = (e, index) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const novasCategorias = [...categorias]
        novasCategorias[index].imagem = reader.result
        setCategorias(novasCategorias)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNome = (e, index) => {
    const novasCategorias = [...categorias]
    novasCategorias[index].nome = e.target.value
    setCategorias(novasCategorias)
  }

  const salvarCategorias = () => {
    localStorage.setItem('categorias', JSON.stringify(categorias))
    alert('Categorias salvas com sucesso!')
  }

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Editar categorias da Home</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categorias.map((cat, index) => (
          <div key={index} className="border p-4 rounded shadow bg-white">
            <label className="block text-sm font-medium mb-1">Nome:</label>
            <input
              type="text"
              value={cat.nome}
              onChange={(e) => handleNome(e, index)}
              className="border w-full p-2 mb-2"
            />
            <label className="block text-sm font-medium mb-1">Imagem:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImagem(e, index)}
              className="mb-2"
            />
            {cat.imagem && (
              <img src={cat.imagem} alt="Preview" className="h-32 object-cover rounded shadow" />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={salvarCategorias}
        className="mt-6 bg-pink-600 text-white px-4 py-2 rounded"
      >
        Salvar Categorias
      </button>
    </div>
  )
}

const Produtos = () => {
  const categorias = ['Canecas', 'Garrafas', 'Agendas', 'Cadernetas']
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('')
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [imagem, setImagem] = useState('')
  const [produtos, setProdutos] = useState(() => {
    const dados = localStorage.getItem('produtos')
    return dados ? JSON.parse(dados) : {}
  })

  const handleImagem = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagem(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const adicionarProduto = () => {
    if (!nome || !preco || !imagem || !categoriaSelecionada) {
      alert('Preencha todos os campos.')
      return
    }

    const novoProduto = { nome, preco, imagem, categoria: categoriaSelecionada }
    const atualizados = { ...produtos }

    if (!atualizados[categoriaSelecionada]) {
      atualizados[categoriaSelecionada] = []
    }

    atualizados[categoriaSelecionada].push(novoProduto)
    setProdutos(atualizados)
    localStorage.setItem('produtos', JSON.stringify(atualizados))

    // Limpar campos
    setNome('')
    setPreco('')
    setImagem('')
  }

  const excluirProduto = (categoria, index) => {
    const copia = { ...produtos }
    if (copia[categoria]) {
      copia[categoria].splice(index, 1)
      setProdutos(copia)
      localStorage.setItem('produtos', JSON.stringify(copia))
    }
  }

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Gerenciar produtos</h3>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <select
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
          className="border p-2"
        >
          <option value="">Selecione uma categoria para adicionar</option>
          {categorias.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImagem}
          className="w-full"
        />
      </div>

      {imagem && (
        <div className="mb-4">
          <p className="text-sm mb-1">Pré-visualização:</p>
          <img src={imagem} alt="Preview" className="h-32 rounded shadow" />
        </div>
      )}

      <button
        onClick={adicionarProduto}
        className="bg-green-600 text-white px-4 py-2 rounded mb-8"
      >
        Adicionar Produto
      </button>

      <h4 className="text-md font-bold mb-4">Produtos cadastrados por categoria:</h4>

      {categorias.map((cat) => (
        <div key={cat} className="mb-8">
          <h5 className="text-pink-600 font-semibold text-lg mb-2">{cat}</h5>
          <div className="grid md:grid-cols-3 gap-4">
            {(produtos[cat] || []).length === 0 ? (
              <p className="text-gray-500 col-span-3">Nenhum produto cadastrado.</p>
            ) : (
              produtos[cat].map((p, index) => (
                <div key={index} className="bg-white border rounded p-2 shadow relative">
                  <button
                    onClick={() => excluirProduto(cat, index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                    title="Excluir"
                  >
                    🗑️
                  </button>
                  <img src={p.imagem} alt={p.nome} className="h-32 object-cover w-full rounded" />
                  <h6 className="font-semibold mt-2">{p.nome}</h6>
                  <p className="text-sm text-gray-600">R$ {p.preco}</p>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const Depoimentos = () => {
  const [depoimentos, setDepoimentos] = useState(() => {
    const dados = localStorage.getItem('depoimentos')
    return dados ? JSON.parse(dados) : [
      { texto: 'Amei minha agenda personalizada! Entrega rápida e qualidade incrível.', autor: 'Juliana R.' }
    ]
  })

  const [novoTexto, setNovoTexto] = useState('')
  const [novoAutor, setNovoAutor] = useState('')
  const [editandoIndex, setEditandoIndex] = useState(null)

  const salvarLocalStorage = (dados) => {
    setDepoimentos(dados)
    localStorage.setItem('depoimentos', JSON.stringify(dados))
  }

  const adicionarOuEditar = () => {
    if (!novoTexto || !novoAutor) return alert('Preencha o depoimento e o autor.')

    const atualizado = [...depoimentos]

    if (editandoIndex !== null) {
      atualizado[editandoIndex] = { texto: novoTexto, autor: novoAutor }
      setEditandoIndex(null)
    } else {
      atualizado.push({ texto: novoTexto, autor: novoAutor })
    }

    salvarLocalStorage(atualizado)
    setNovoTexto('')
    setNovoAutor('')
  }

  const editar = (index) => {
    const item = depoimentos[index]
    setNovoTexto(item.texto)
    setNovoAutor(item.autor)
    setEditandoIndex(index)
  }

  const excluir = (index) => {
    const atualizado = [...depoimentos]
    atualizado.splice(index, 1)
    salvarLocalStorage(atualizado)
  }

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Depoimentos de clientes</h3>

      <div className="grid gap-4 mb-6">
        <textarea
          placeholder="Texto do depoimento"
          value={novoTexto}
          onChange={(e) => setNovoTexto(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Nome do cliente"
          value={novoAutor}
          onChange={(e) => setNovoAutor(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={adicionarOuEditar}
          className="bg-pink-600 text-white px-4 py-2 rounded w-full md:w-fit"
        >
          {editandoIndex !== null ? 'Salvar edição' : 'Adicionar Depoimento'}
        </button>
      </div>

      <h4 className="font-bold mb-2">Lista de depoimentos:</h4>
      <div className="space-y-4">
        {depoimentos.map((dep, index) => (
          <div key={index} className="bg-white border rounded p-4 shadow relative">
            <p className="italic">"{dep.texto}"</p>
            <p className="text-right mt-2 font-semibold">– {dep.autor}</p>
            <div className="absolute top-2 right-2 space-x-2">
              <button onClick={() => editar(index)} className="text-blue-500 hover:underline text-sm">✏️</button>
              <button onClick={() => excluir(index)} className="text-red-500 hover:underline text-sm">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


const Destaque = () => {
  const [titulo, setTitulo] = useState(() => localStorage.getItem('destaqueTitulo') || '')
  const [descricao, setDescricao] = useState(() => localStorage.getItem('destaqueDescricao') || '')
  const [imagem, setImagem] = useState(() => localStorage.getItem('destaqueImagem') || '')
  const [link, setLink] = useState(() => localStorage.getItem('destaqueLink') || '')
  const [preco, setPreco] = useState(() => localStorage.getItem('destaquePreco') || '')

  const handleImagem = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagem(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const salvarDestaque = () => {
    localStorage.setItem('destaqueTitulo', titulo)
    localStorage.setItem('destaqueDescricao', descricao)
    localStorage.setItem('destaqueImagem', imagem)
    localStorage.setItem('destaqueLink', link)
    localStorage.setItem('destaquePreco', preco)
    alert('Destaque do mês salvo com sucesso!')
  }

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Destaque do mês</h3>

      <input
        type="text"
        placeholder="Nome do produto em destaque"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="border p-2 w-full mb-3"
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="border p-2 w-full mb-3"
      />
      <input
        type="number"
        placeholder="Preço do produto (ex: 49.90)"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        className="border p-2 w-full mb-3"
      />
      <input
        type="text"
        placeholder="Link do botão (ex: /categorias/cadernetas)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="border p-2 w-full mb-3"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImagem}
        className="mb-3"
      />

      {imagem && (
        <div className="mb-4">
          <p className="text-sm mb-1">Pré-visualização:</p>
          <img src={imagem} alt="Destaque" className="h-40 object-cover rounded shadow" />
        </div>
      )}

      <button
        onClick={salvarDestaque}
        className="bg-pink-600 text-white px-4 py-2 rounded"
      >
        Salvar Destaque
      </button>
    </div>
  )
}


const Pagamentos = () => {
  const [pagamentos, setPagamentos] = useState([])

  useEffect(() => {
    const buscarPagamentos = async () => {
      try {
        const resp = await fetch("http://localhost:3000/pagamentos")
        const data = await resp.json()
        setPagamentos(data)
      } catch (err) {
        console.error("Erro ao buscar pagamentos:", err)
      }
    }

    buscarPagamentos()
  }, [])

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Pagamentos recebidos</h3>

      {pagamentos.length === 0 ? (
        <p className="text-gray-500">Nenhum pagamento encontrado ainda.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-pink-100">
                <th className="border px-3 py-2">ID</th>
                <th className="border px-3 py-2">Produto</th>
                <th className="border px-3 py-2">Valor</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {pagamentos.map((p) => (
                <tr key={p.id}>
                  <td className="border px-3 py-2">{p.id}</td>
                  <td className="border px-3 py-2">{p.produto}</td>
                  <td className="border px-3 py-2">R$ {p.valor.toFixed(2)}</td>
                  <td className="border px-3 py-2 text-green-600 font-semibold">{p.status}</td>
                  <td className="border px-3 py-2">{p.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


export default Admin
