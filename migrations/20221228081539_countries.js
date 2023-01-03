exports.up = function (knex) {
  return knex.schema.createTable('countries', (table) => {
    table.increments('id').primary();
    table.string('name').notNull();
    table.string('capital');
    table.string('userId');
    table.timestamp('dateCreated').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('countries');
};
