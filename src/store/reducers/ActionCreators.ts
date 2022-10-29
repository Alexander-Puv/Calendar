import { AuthActionCreators } from "./auth/actionCreators";
import { EventActionCreators } from "./event/ActionCreators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
}