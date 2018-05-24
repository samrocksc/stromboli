const { browse } = require('../handlers/about/controllers');

const aboutRoutes = {
  name: 'About Routes',
  register: async server => {
    server.route([
      {
        method: 'GET',
        path: '/about',
        handler: browse,
        config: {
          description: 'Browse Events',
        },
      },
    ]);
  },
};

module.exports = aboutRoutes;
