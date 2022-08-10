const { Model } = require("objection");
const Knex = require('knex');
const knex = require("knex");
const config = require("../knexfile");

Model.knex(knex(config['development']));

class Fact extends Model {
  static get tableName() {
    return 'facts'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['fact', 'recepient'],
      properties: {
        id: { type: 'integer' },
        fact: { type: 'string', maxLength: 1000 },
        recepient: { type: 'string' }
      }
    }
  }
}

module.exports = Fact