import App, { Express } from 'express';
import BodyParser from 'body-parser';
import Morgan from 'morgan'
import cors from 'cors';
import routes from './routes';
import config from 'config';

const app: Express = App();

app.use(Morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(BodyParser.json({ limit: '50mb' }));
app.use('/image', App.static(config.storage.imageFolder));
app.use((req, res, next) => {
  console.log(`authorization token: ${req.headers.authorization}`);
  next();
});
app.use(routes);

app.listen(
  config.server.port,
  () => console.log(`App listening on port ${config.server.port}...`)
);
