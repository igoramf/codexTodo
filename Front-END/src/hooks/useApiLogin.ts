import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

export const useApiLogin = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('/users/validate', {}, {
            headers: {
                auth: token
            }
        });
        return response.data;
    },
    signin: async (email: string, password: string) => {
        const response = await api.post('/users/auth' , { 
            "email": email,
            "senha": password
        });
        return response.data;
    },
    signup: async (email: string, name: string, age: number, genero: string, password: string) => {
        const response = await api.post('/users/cadastrar' , { 
            "email": email,
            "nome": name,
            "idade": age,
            "genero": genero,
            "senha": password
        });
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/users/logout');
        return response.data;
    },
    update: async (email: string, name: string, age: number) => {
        const response = await api.put('/users/editar', {
            "email": email,
            "nome": name,
            "idade": age
        });
        return response.data;
    }
})