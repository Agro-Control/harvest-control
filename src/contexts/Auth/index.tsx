import {createContext, ReactNode, useEffect, useReducer, useRef} from "react";
import useCookie from "@/utils/hooks/useCookies";
import {UserData} from "@/types/user";
import {factory} from "./factory";
import {reducer} from "./reducer";
import {api} from "@/lib/api";
import {jwtDecode, JwtPayload} from "jwt-decode";

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
    const {getCookie} = useCookie();
    const actions = useRef(factory(dispatch));
    const {setUser} = actions.current;
    const {user} = state;
    const token = getCookie("user_session");

    const userId = token && jwtDecode<UserSessionJwt>(token).id;

    const getUserSession = async (id: number): Promise<UserData> => {
        const {data} = await api.get(`/usersession/${id}`);
        return data;
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
