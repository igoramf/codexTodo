import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  
  public async index({}: HttpContextContract) {
    const user = await User.all()
    return user
  }

  public async store({ request }: HttpContextContract) {
    const body = request.only(['name', 'email', 'password'])
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password
    })
    return user
  }

  public async show({ request }: HttpContextContract) {
    const userId = request.param('id')
    const user = await User.findOrFail(userId)
    return user
  }

  public async update({ request }: HttpContextContract) {
    const userId = request.param('id')
    const body = request.only(['name', 'email', 'password'])
    const user = await User.findOrFail(userId)
    await user.merge( body ).save() //vai mesclar com as informações que já existe, e não zerar caso não seja passado algum paramentro
    return user
  }

  public async destroy({ request }: HttpContextContract) {
    const userId = request.param('id')
    const user = await User.findOrFail(userId)
    await user.delete()
  }
}
