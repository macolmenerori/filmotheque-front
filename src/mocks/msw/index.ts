const IS_BROWSER = typeof window !== 'undefined';

export const setupMocks = async () => {
  if (!IS_BROWSER) {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start();
  }
};
