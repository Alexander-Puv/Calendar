import { Navigate, Route, Routes } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Event } from '../pages/Event';
import { Login } from '../pages/Login';

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/',
}

export const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.auth)
    
    return (
        <Routes>
            {isAuth ?
                <>
                    <Route path={RouteNames.EVENT} element={<Event />}/>
                    <Route path={'*'} element={<Navigate to={RouteNames.EVENT} />} />
                </>
            :
                <>
                    <Route path={RouteNames.LOGIN} element={<Login />}/>
                    <Route path={'*'} element={<Navigate to={RouteNames.LOGIN} />} />
                </>
            }
        </Routes>
    )
}
