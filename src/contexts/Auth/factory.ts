import { Action } from "./actions";
import { Dispatch } from "react";
import { UserData } from "@/types/user";


export const factory = (dispatch: Dispatch<Action>) => {
    return {
        setUser: (payload: UserData | null) => {
            dispatch({ type: "SET_USER", payload });
            dispatch({ type: "SET_LOADING", payload: false });
        },
    };
};