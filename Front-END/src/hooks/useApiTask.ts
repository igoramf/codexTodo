import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/'
});

export const useApiTask = () => ({
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
    getUserTodo: async (id: string) => {
        const response = await api.get('/tarefa',{
            params: {
                id: id
            }
        });
        return response.data;
    },
    deleteTodo: async (id: string) => {
        const response = await api.delete('/tarefa', {
            data: {_id: id}
        });
        return response.data;
    },
    getTodos: async () => {
        const response = await api.get('/tarefa');
        return response.data;
    },
})