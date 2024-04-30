import User from "@/types/user";

type UserAction = { type: "SET_USER"; payload: User | null };
type LoadingAction = { type: "SET_LOADING"; payload: boolean };

export type Action = UserAction | LoadingAction;