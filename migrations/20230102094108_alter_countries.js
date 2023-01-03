exports.up = function (knex) {
    return knex.schema.alterTable('countries', (table) => {
        table.string('imageUrl')
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('countries');
  };
  