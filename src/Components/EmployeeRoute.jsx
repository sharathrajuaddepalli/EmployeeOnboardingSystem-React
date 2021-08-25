import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLogin,isHR} from "../Utils";

const EmployeeRoute = ({component: Component, ...rest}) => {
   return (
        <Route {...rest} render={props => (
            isLogin()  ?
                (!isHR() ?<Component {...props} />:<Redirect to="/**"></Redirect>)
            : <Redirect to="/login" />
        )} />
    );
};

export default EmployeeRoute;