import { selectIsLoggedIn } from 'features/auth/authSlice';
import * as React from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import {useAppSelector} from '../../app/hooks'

export interface PrivateRouterProps {
}

export function PrivateRouter ({children}:{children: JSX.Element}) {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const isAuthenticated = isLoggedIn ;
    if(!isAuthenticated) {
        return <Navigate to='/login' />
    }else{
        return (
          children
        );
    }
}
