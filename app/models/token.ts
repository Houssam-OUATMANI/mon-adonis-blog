import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  declare id: number


  @column()
  declare token: string

  @column()
  declare email: string

  @column()
  declare isUsed: boolean

  @column.dateTime()
  declare expiriesAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}