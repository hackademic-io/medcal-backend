import express from 'express';
import cors from 'cors';
import routes from './src/routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

const PORT = 3000;

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
