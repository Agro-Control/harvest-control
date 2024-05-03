import {createContext, ReactNode, useEffect, useReducer, useRef} from "react";
import {factory} from "./factory";
import {reducer} from "./reducer";
import User from "@/types/user";
import useCookie from "@/utils/hooks/useCookies";

export type AuthState = {
    user: User | null;
    isLoading: boolean;
};

export type AuthActions = {
    setUser: (user: User | null) => void;
};

const initialState: AuthState = {
    user: null,
    isLoading: true,
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<[AuthState, AuthActions] | null>(null);

export function AuthContextProvider({children}: AuthContextProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {getCookie} = useCookie();
    const actions = useRef(factory(dispatch));
    const {setUser} = actions.current;
    const {user} = state;

    useEffect(() => {
        if (!user) {
            const getFromCookie = async () => {
                const existingUser = getCookie("user");
                if (existingUser) {
                    try {
                        setUser(JSON.parse(existingUser));
                    } catch (e) {
                        console.log(e);
                    }
                }
            };
            getFromCookie();
        }
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return <AuthContext.Provider value={[state, actions.current]}>{children}</AuthContext.Provider>;
}
