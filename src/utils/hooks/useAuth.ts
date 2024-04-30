import { AuthContext } from "@/contexts/Auth";
import useCookie from "./useCookies";
import { useContext } from "react";
import User from "@/types/user";


export const useAuth = () => {
    const authData = useContext(AuthContext);
    if (!authData) {
        throw new Error("useAuth must be used within a <AuthContextProvider />");
    }
    
    const { setCookie, removeCookie } = useCookie();
    const { user, isLoading } = authData[0];
    
    const addUser = (user: User | null) => {
        authData[1].setUser(user);
        setCookie("user", JSON.stringify(user));
    }
    
    const removeUser = () => {
        removeCookie("user");
        authData[1].setUser(null);
        window.location.href = "/login";
    }


    return { user, isLoading, addUser, removeUser }
};