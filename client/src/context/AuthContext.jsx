import React, {createContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

useEffect(()=>{
    const token = localStorage.getItem('authToken');
    if (token) {
        try {
        const decodedUser = jwtDecode(token);
        setCurrentUser(decodedUser);
        } catch (error) {
            console.error("Token inválido", error);
            localStorage.removeItem("authToken");
            setCurrentUser(null); // nunca guardar el error
        }
    }
},[]);

const login = (token) => {
    localStorage.setItem('authToken', token);
    const decodedUser = jwtDecode(token);
    setCurrentUser(decodedUser);
};

const navigate = useNavigate();

const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
    navigate("/");
};

const value = { currentUser, login, logout };

return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

}