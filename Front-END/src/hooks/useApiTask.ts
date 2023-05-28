import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-todolist-37w4.onrender.com/'
});


// CUSTOM HOOK PARA REALIZACAO DE REQUISICOES RELACIONADAS AS TAREFAS
export const useApiTask = () => ({

    // CRIA TAREFA
    create: async (nome: string, description: string, data: string, done: boolean, user: string) => {
        const response = await api.post('/tarefa' , { 
            "nome": nome,
            "descricao": description,
            "data": data,
            "concluida": done,
            "usuario": user 
        });
        return response.data;
    },

    // RETORNA TODOS AS TAREFAS CRIADAS POR UM USUARIO
    getUserTodo: async (id: string) => {
        const response = await api.get('/tarefa',{
            params: {
                id: id
            }
        });
        return response.data;
    },

    // DELETA UMA TAREFA
    deleteTodo: async (id: string) => {
        const response = await api.delete('/tarefa', {
            data: {_id: id}
        });
        return response.data;
    },

    // PEGA TODAS AS TAREFAS DO SISTEMA
    getTodos: async () => {
        const response = await api.get('/tarefa');
        return response.data;
    },

    // ATUALIZA O STATUS DA TAREFA
    updateTodo: async (id: string) => {
        await api.put('/tarefa', {
            "_id": id,
            "concluida": true
        })
    },

    // ATUALIZA ELEMENTOS DO TODO
    updateTodoItem: async (id: string, title: string, description: string) => {
        await api.put('/tarefa', {
            "_id": id,
            "nome": title,
            "descricao": description
        })
    }
})