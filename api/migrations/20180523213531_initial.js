exports.up = async knex => {
  // TODO: Create a User's table
  // create a list of users to be consumed by the blog and general permissions
  // This table will also hold general information about the user.
  // This can be used to create shortened names etc.
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary();
    table.string('reference_id');
    table.text('first_name');
    table.text('last_name');
    table.text('email');
    table.text('phone_number');
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
  // TODO: abouts
  // create about data for a user
  // this will be a general description of the blog
  // This can also be used for settings
  await knex.schema.createTable('user_settings', table => {
    table.uuid('id').primary();
    table
      .string('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.text('description');
    table.text('about');
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
  // create a list of available tags
  await knex.schema.createTable('tags', table => {
    table.uuid('id').primary();
    table.string('name', 64).notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
  // create the data behind the blog.
  // reference a user
  // holds title, description, and settings for the blog
  await knex.schema.createTable('blogs', table => {
    table.uuid('id').primary();
    table
      .string('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.text('content');
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
  // TODO: create a blog post
  // blog can be public, private, or selective
  // every blog contains a list of tags
  // is visible
  await knex.schema.createTable('blog_posts', table => {
    table.uuid('id').primary();
    table
      .string('id')
      .references('blog')
      .inTable('blogs')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.text('');
    table.string('url');
    table.string('url_real');
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
  // TODO: create available scan codes
  // contains an id to the blog post.
  // contains a used_at to know if it has been used
  await knex.schema.createTable('qr_codes', table => {
    table.uuid('id').primary();
    table
      .string('blog_id')
      .references('id')
      .inTable('blogs')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('used_at').defaultTo(knex.fn.now());
  });
  // TODO: Create statuses for TODO
  await knex.schema.createTable('todo_statuses', table => {
    table.increments('id').primary();
    table.string('label');
  });
  // TODO: Create a TodoMVC item
  await knex.schema.createTable('todos', table => {
    table.uuid('id').primary();
    table.text('description');
    table
      .string('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .string('status')
      .references('id')
      .inTable('todo_statuses')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('completed_at');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('todos');
  await knex.schema.dropTable('todo_statuses');
  await knex.schema.dropTable('qr_codes');
  await knex.schema.dropTable('blog_posts');
  await knex.schema.dropTable('blogs');
  await knex.schema.dropTable('tags');
  await knex.schema.dropTable('user_settings');
  await knex.schema.dropTable('users');
};
