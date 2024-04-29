import { useContext } from "react";

import {  AuthContext, AuthState } from "@/contexts/Auth";
import useCookie from "./useCookies";
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
        authData[1].setUser(null);
        removeCookie("user");
    }


    return { user, isLoading, addUser, removeUser }
};