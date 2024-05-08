import { UserData } from "@/types/user";

type UserAction = { type: "SET_USER"; payload: UserData | null };
type LoadingAction = { type: "SET_LOADING"; payload: boolean };

export type Action = UserAction | LoadingAction;