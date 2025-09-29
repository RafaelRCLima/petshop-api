import Express from 'express';
import routes from './routes.js';
import logger from './lib/logger.js';

const port = 3000;
const app = Express();

app.use(Express.json());
app.use(routes);

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});

export default app;
