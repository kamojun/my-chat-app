import express from 'express';
import cors from 'cors';
import messageRoutes from './routes/message';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/message', messageRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
