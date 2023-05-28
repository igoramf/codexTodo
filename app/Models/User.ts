import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Task from "App/Models/Task";

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public gender: string;

  @column()
  public age: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public image: string;

  @column()
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Irá me possibilitar pegar as tarefas relacionado ao usuário
  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}