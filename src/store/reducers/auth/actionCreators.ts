import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IUser } from "../../../models/IUser";
import { AuthActionEnum, SetErrorAction, SetIsAuthAction, SetIsLoadingAction, SetUserAction } from "./types";

export const AuthActionCreators = {
    setIsAuth: (payload: boolean): SetIsAuthAction => ({type: AuthActionEnum.SET_IS_AUTH, payload}),
    setUser: (payload: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            setTimeout(async () => {
                const response = await UserService.getUsers();
                const mockUsers = response.data.find(user => user.username === username && user.password === password);
                if (mockUsers) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUsers.username);
                    dispatch(AuthActionCreators.setUser(mockUsers));
                    dispatch(AuthActionCreators.setIsAuth(true));
                } else {
                    dispatch(AuthActionCreators.setError('Uncorrect username or password'));
                }
                dispatch(AuthActionCreators.setIsLoading(false));
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreators.setError('Error occurred whle logging in'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false))
    }
}