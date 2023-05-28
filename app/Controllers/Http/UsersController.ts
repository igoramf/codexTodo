
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {v4 as uuidv4} from 'uuid'
import Application from '@ioc:Adonis/Core/Application'

export default class UsersController {

  // valida o tipo e o tamanho da imagem
  private validationOptions = {
    types: ["image"],
    size: "2mb"
  }

  // Listar todos os usuários
  public async index({ response }: HttpContextContract) {  

    try {
      const users = await User.query().preload('tasks');
      return response.ok(users);
    } catch (error) {
      return response.status(500).send({error: 'Tarefa não encontrada'});
    }
  }

  // Criar um novo usuário com imagem passado por paramentro
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const body = request.only(['name', 'gender', 'age', 'email', 'password', 'image'])
      // Valida a imagem antes de inserir no sistema
      const image = request.file('image', this.validationOptions)

      if (image) {
        const imageName = `${uuidv4()}.${image.extname}`

        await image.move(Application.tmpPath('uploads'), {
          name: imageName,
        })

        body.image = imageName
      }

      const user = await User.create({
        name: body.name,
        gender: body.gender,
        age: body.age,
        email: body.email,
        password: body.password,
        image: body.image
      })

      const token = await auth.use("api").login(user, {
        expiresIn: "10 days",
      })
      return token.toJSON()

    } catch (error) {
      return response.status(500).send({ error: 'Erro ao criar usuário' })
    }
  }

  // Exibir um usuário específico
  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.load('tasks')
      return response.ok(user)

    } catch (error) {
      return response.status(404).send({ error: 'Usuário não encontrado' })
    }
  }

  // Atualizar um usuário
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const data = request.only(['name', 'age', 'image'])
      const user = await User.findOrFail(params.id)
  
      // Vai mesclar com as informações que já existem, e não zerar caso não seja passado algum parâmetro
      user.merge(data)
  
      // Só atualiza se as imagens forem diferentes
      if (user.image !== data.image || !user.image) {
        const image = request.file('image', this.validationOptions)
  
        if (image) {
          const imageName = `${uuidv4()}.${image.extname}`
  
          await image.move(Application.tmpPath('uploads'), {
            name: imageName,
          })
          user.image = imageName
        }
      }
      await user.save()
      return response.ok(user)

    } catch (error) {
      return response.status(404).send({ error: 'Usuário não encontrado' })
    }
  }

  // Excluir um usuário
  public async destroy({ params, response }: HttpContextContract) {   
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.ok('Excluído com sucesso')

    } catch (error) {
      return response.status(404).send({ error: 'Usuário não encontrado' })
    }
  }
}

