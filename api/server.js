const Glue = require('glue');
const { manifest } = require('./config');

const options = {
  relativeTo: __dirname,
};

const startServer = async () => {
  try {
    const server = await Glue.compose(manifest, options);
    await server.start();
    console.log('Server running at:', server.info.uri);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
