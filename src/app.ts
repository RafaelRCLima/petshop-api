import Express from 'express';
import routes from './routes.js';
import logger from './lib/logger.js';
import cors from 'cors';

const port = 3000;
const app = Express();

app.use(
  cors({
    origin: process.env.PETSHOP_UI_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(Express.json());
app.use(routes);

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});

export default app;
