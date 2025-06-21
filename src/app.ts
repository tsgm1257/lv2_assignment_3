import express from 'express';
import bookRoutes from './controllers/book.controller';
import borrowRoutes from './controllers/borrow.controller';
import { errorHandler } from './app/middlewares/errorHandler';

const app = express();
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req, res) => {
  res.send('Library Management System API');
});

app.use(errorHandler);

export default app;
