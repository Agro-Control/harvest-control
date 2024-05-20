import { AuthContext } from "@/contexts/Auth";
import useCookie from "./useCookies";
import { useContext } from "react";
import User, { UserData } from "@/types/user";


export const useAuth = () => {
    const authData = useContext(AuthContext);
    if (!authData) {
        throw new Error("useAuth must be used within a <AuthContextProvider />");
    }
    
    const { setCookie, removeCookie } = useCookie();
    const { user, isLoading } = authData[0];
    
    const addUser = (user: User | null) => {
        if(!user) return;
        authData[1].setUser(user?.usuario);
        setCookie("user_session", user?.token);
    }
    
    const removeUser = () => {
        removeCookie("user_session");
        authData[1].setUser(null);
        window.location.href = "/login";
    }


    return { user, isLoading, addUser, removeUser }
};