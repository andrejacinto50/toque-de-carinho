import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-pink-100 text-center py-4 text-sm text-gray-600 mt-8">
      © {new Date().getFullYear()} Toque de Carinho. Todos os direitos reservados.
    </footer>
  )
}

export default Footer
