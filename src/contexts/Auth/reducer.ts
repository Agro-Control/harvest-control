import { Action } from "./actions";
import { AuthState } from ".";


export const reducer = (state: AuthState, action: Action): AuthState => {
    switch (action.type) {
        case "SET_USER": {
            return { ...state, user: action.payload };
        }
        case "SET_LOADING": {
            return { ...state, isLoading: action.payload };
        }
        default:
            return state;
    }
};