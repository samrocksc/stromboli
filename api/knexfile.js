module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || 'postgres://postgres@localhost/stromboli',
    pool: {
      min: 1,
      max: 7,
    },
    seeds: {
      directory: './migrations/seed_dev',
    },
  },
};
