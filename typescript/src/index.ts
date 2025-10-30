/**
 * Main Express application
 * Demonstrates Copilot generating Express application setup
 */

import express, { Express } from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';
import { errorHandler, notFound, requestLogger } from './middleware/errorHandler';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configure CORS with specific origins
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
  origin: allowedOrigins
}));
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/v1/books', bookRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;

// Start server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
