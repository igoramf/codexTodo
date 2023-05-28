
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task';

export default class TasksController {

    // retorna todas as listas de tarefa
    public async index({ response, auth }: HttpContextContract) {
        try {
            const user = await auth.authenticate();
            const tasks = await Task.query().where('user_id', user.id);
            return response.ok(tasks);
        } catch (error) {
            return response.status(500).send({error: 'Erro ao listar as tarefas!'});
        }
    }

    // retona uma única lista de tarefa
    public async show({ response, params, auth}: HttpContextContract) {
        try {
            const user = await auth.authenticate();
            const task = await Task.query().where('user_id', user.id).where('id', params.id).firstOrFail();
            return response.ok(task);
        } catch (error) {
            console.log(error)
            return response.status(500).send({error: 'Tarefa não encontrada'});
        }
    }

    // usado para atualizar cada parametro de Todo, passando os novos dados por parametro
    public async update({ request, params, response, auth }: HttpContextContract) {
        const user = await auth.authenticate();
        const task = await Task.query().where('user_id', user.id).where('id', params.id).firstOrFail();
    
        task.title = request.input('title')
        task.desc = request.input('desc')
        task.status = request.input('status') === '1' ? 1 : 0
    
        if (await task.save()) {
          return response.ok(task)
        }   
        return response.status(422).send('Não foi possível atualizar a tarefa.')
      }

    // cria uma nova Todo no banco de dados
    public async store({ auth, request, response }: HttpContextContract) {
        const user = await auth.authenticate();
        const task = new Task();
        task.title = request.input('title');
        task.desc = request.input('desc');
        task.status = request.input('status');

        try {
            await user.related('tasks').save(task);
        } catch (error) {
            return response.status(500).send('Não foi possível criar a tarefa.')
        }
        
        return response.redirect().toRoute('tasks.show', { id: task.id })
  
    }

    // deleta um Todo passando um id para isso
    public async destroy({ auth, response, params }: HttpContextContract) {
        const user = await auth.authenticate();
        
        try {
            const task = await Task.query()
                .where('user_id', user.id)
                .where('id', params.id)
                .firstOrFail() 
            await task.delete()
        } catch (error) {
            console.log(error)
            return response.status(500).send({error: 'Tarefa não encontrada'});
        }
    
        return response.json({ message: 'Excluído com sucesso' })
      }

}
