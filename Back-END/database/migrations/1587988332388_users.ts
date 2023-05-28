import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('name', 60).notNullable();
      table.string('gender').notNullable();
      table.integer('age').notNullable();
      table.string('email', 60).notNullable();
      table.string('password').notNullable();
      table.string('image')
      table.string('remember_me_token').nullable()
      table.timestamps(true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
