const bootstrap = {
  name: 'bootstrap',
  version: '0.1.0',
  register: async (server) => {
    server.ext('onRequest', (request, h) => {
      // allow for the /api prefix
      request.setUrl(request.url.path.replace(/\/api\//, '/'));
      return h.continue;
    });
  },
};

module.exports = bootstrap;
