import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Rota: Home');
});

router.post('/teste', (req, res) => {
  console.log(req.body);

  return res.status(StatusCodes.UNAUTHORIZED).json(req.body); // Envia os dados no formato Json
});



export { router };
