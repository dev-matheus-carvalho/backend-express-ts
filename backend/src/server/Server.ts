import express from 'express';
import 'dotenv/config';

import './shared/services/TranslationsYup';
import { router } from './routes/index';

const server = express();

// Faz com que o consteúdo da requisição seja enviado no formato Json
server.use(express.json());

// Usando as rotas
server.use(router);


export { server };
