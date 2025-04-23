import express from 'express';
import cors from 'cors';
import mercadopago from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Configuração do Mercado Pago com sua chave de acesso
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN // Isso vem do .env
});

// Middlewares
app.use(express.json());
app.use(cors());

// Rota principal
app.get('/', (req, res) => {
  res.send('Servidor rodando com Mercado Pago!');
});

// 🧾 Rota para criar uma preferência de pagamento
app.post('/create_preference', async (req, res) => {
  try {
    const { title, quantity, unit_price } = req.body;

    const preference = {
      items: [
        {
          title,
          quantity: Number(quantity),
          unit_price: Number(unit_price),
          currency_id: 'BRL',
        }
      ],
      back_urls: {
        success: 'http://localhost:5173/sucesso',
        failure: 'http://localhost:5173/erro',
        pending: 'http://localhost:5173/pendente'
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ id: response.body.id });

  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({ error: 'Erro ao criar preferência' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
