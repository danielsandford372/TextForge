import app from './app';
import config from './config';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║                                            ║
║         TextForge API Server               ║
║                                            ║
║  Status: Running                           ║
║  Port: ${PORT}                               ║
║  Environment: ${config.nodeEnv.padEnd(27)}║
║  API Prefix: ${config.apiPrefix.padEnd(25)}║
║                                            ║
║  Documentation: http://localhost:${PORT}${config.apiPrefix}/health  ║
║                                            ║
╚════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default server;
