import {createContext, ReactNode, useEffect, useReducer, useRef} from "react";
import useCookie from "@/utils/hooks/useCookies";
import {UserData} from "@/types/user";
import {factory} from "./factory";
import {reducer} from "./reducer";
import {api} from "@/lib/api";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {AxiosError} from "axios";

export type AuthState = {
    user: UserData | null;
    isLoading: boolean;
};

export type AuthActions = {
    setUser: (user: UserData | null) => void;
};

const initialState: AuthState = {
    user: null,
    isLoading: true,
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export interface UserSessionJwt extends JwtPayload {
    tipo: string;
    id: number;
}

export const AuthContext = createContext<[AuthState, AuthActions] | null>(null);

export function AuthContextProvider({children}: AuthContextProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {getCookie, removeCookie} = useCookie();
    const actions = useRef(factory(dispatch));
    const {setUser} = actions.current;
    const {user} = state;
    const token = getCookie("user_session");

    const userId = token && jwtDecode<UserSessionJwt>(token).id;

    const getUserSession = async (id: number): Promise<UserData | null> => {
        try {
            const {data} = await api.get(`/usersession/${id}`);

            return data;
        } catch (error: any) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 401) {
                window.location.href = "/login";
                removeCookie("user_session");
            }
            return null;
        }
    };

    useEffect(() => {
        if (user) return;
        if (userId) {
            getUserSession(userId).then((userSession) => setUser(userSession));
        }
    }, []);

    useEffect(() => {
        console.log("Usuario Logado: ", user);
    }, [user]);

    return <AuthContext.Provider value={[state, actions.current]}>{children}</AuthContext.Provider>;
}
