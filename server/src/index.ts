import App, { Express } from 'express';
import BodyParser from 'body-parser';
import Morgan from 'morgan'
import routes from './routes';
import config from 'config';
import checkUser from 'middleware/checkUser';
import AsyncHandler from 'express-async-handler';
import fileUpload from 'express-fileupload';

const app: Express = App();

app.use(Morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(BodyParser.json({ limit: '50mb' }));
app.use(fileUpload());
app.use('/image', App.static(config.storage.imageFolder));
app.use(AsyncHandler(checkUser()));
app.use(routes);

app.listen(
  config.server.port,
  () => console.log(`App listening on port ${config.server.port}...`)
);
