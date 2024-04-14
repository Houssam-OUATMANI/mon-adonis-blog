import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('role').checkIn(["ADMIN", "USER"]).defaultTo('USER')
    })
  }

  async down() {
    this.schema.table(this.tableName, (t) => t.dropColumn('role') )
  }
}