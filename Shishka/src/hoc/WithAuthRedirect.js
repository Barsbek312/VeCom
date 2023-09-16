import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const WithAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {
        const {isAuth} = useSelector(state => state.user);
        
        if(isAuth === false) return <Navigate to="/entrance" />
        return <Component {...props} />
    }

    return RedirectComponent;
}


  