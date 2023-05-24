import {  createContext } from 'react';
import { User } from '../../types/User';

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
    signup: (email: string, password: string, age: number, name: string, surname: string) => Promise<boolean>; 
}


export const AuthContext = createContext<AuthContextType>(null!);