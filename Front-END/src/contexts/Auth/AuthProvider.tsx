import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { User } from "../../types/User";
import { useApiLogin } from "../../hooks/useApiLogin";


// PROVIDER DO AuthCONTEXT

export const AuthProvider = ( {children} : {children: JSX.Element}) => {
    const [user, setUser] = useState<User | null>(null);
    const api = useApiLogin();


    // MANTEM O USUARIO LOGADO NO SISTEMA
    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem("authToken");
            if(storageData){
                const data = await api.validateToken(storageData);
                if(data.user){
                    setUser(data.user)
                }
            }
        };
        validateToken();
    }, [api])


    // REALIZA O LOGIN DO USUARIO

    const signin =  async (email: string, password: string) => {
        const data = await api.signin(email, password);
        
        if(data.login && data.token){
            setUser(data.login);
            setToken(data.token)
            return true;
        }
        return false;
    }

    // REALIZA O CADASTRO DO USUARIO
    const signup = async (email: string, name: string, age: number, surname: string, password: string) => {
        const data = await api.signup(email, name, age, surname, password);
        if(data.user){
            setUser(data.User)
            return true
        }
        return false
    }

    // ATUALIZA UM USUARIO
    const updateUser = async (email: string, name: string, age: number) => {
        await api.update(email, name, age);
    }

    // DESLOGA O USUARIO DO SISTEMA

    const signout = async () => {
        setUser(null)
        setToken("")
    }

    const setToken = (token: string ) => {
        localStorage.setItem("authToken", token);
    }

    return (
        <AuthContext.Provider value = {{user, signin , signout, signup}}>
            {children}
        </AuthContext.Provider>
    )
}