const app = require('./src/app');

const PORT = Number(process.env.PORT) || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received. Shutting down server.`);
  server.close(() => process.exit(0));
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
