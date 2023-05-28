import axios from 'axios';


// CUSTOM HOOK PARA REALIZACAO DE REQUISICOES RELACIONADAS AO USUARIO

const api = axios.create({
    baseURL: 'https://api-todolist-37w4.onrender.com/'
});



export const useApiLogin = () => ({

    // VALIDA O TOKEN DO USUARIO QUANDO ELE ESTA LOGADO
    validateToken: async (token: string) => {
        const response = await api.post('/users/validate', {}, {
            headers: {
                auth: token
            }
        });
        return response.data;
    },

    // REQUISICAO DE LOGIN
    signin: async (email: string, password: string) => {
        const response = await api.post('/users/auth' , { 
            "email": email,
            "senha": password
        })
        return response.data;
    },

    // REQUISICAO DE CADASTRO
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

    // SAIDA DO USUARIO DO SISTEMA
    logout: async () => {
        const response = await api.post('/users/logout');
        return response.data;
    },

    // ATUALIZACAO DE USUARIO
    update: async (email: string, name: string, age: number) => {
        const response = await api.put('/users/editar', {
            "email": email,
            "nome": name,
            "idade": age
        });
        return response.data;
    }
})