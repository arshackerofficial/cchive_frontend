import { createContext, useContext, useEffect, useState } from "react";
import api from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await api.get('/auth/validate_token');
                setUser(res.data.data);
            } catch (err) {
                console.log(err);
                setUser(null);
            }
        }
        checkUser();
    }, [])

    const login = async (email, password) => {
        const res = await api.post('/auth/sign_in', {email, password});
        setUser(res.data.data);
        return res.data.data;
    }
    const register = async (email, password, first_name, last_name, bio, username) => {
        const res = await api.post('/auth', {email, password, first_name, last_name, bio, username});
        setUser(res.data.data);
        return res.data.data;
    }
    const logout = async () => {
        await api.delete('/auth/sign_out');
        localStorage.clear();
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);