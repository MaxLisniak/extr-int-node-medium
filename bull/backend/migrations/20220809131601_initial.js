/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

  return knex.schema.createTable('facts', function (table) {
    table.increments('id').primary();
    table.string("recepient");
    table.string("fact", 1000);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('facts')
};
