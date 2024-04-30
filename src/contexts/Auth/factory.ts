import { Action } from "./actions";
import { Dispatch } from "react";
import User from "@/types/user";


export const factory = (dispatch: Dispatch<Action>) => {
    return {
        setUser: (payload: User | null) => {
            dispatch({ type: "SET_USER", payload });
            dispatch({ type: "SET_LOADING", payload: false });
        },
    };
};