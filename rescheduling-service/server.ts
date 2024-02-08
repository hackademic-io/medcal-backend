import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

const PORT = 3000;

app.get('/reschedule', (req, res) => {
  res.send('Rescheduling Service');
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
