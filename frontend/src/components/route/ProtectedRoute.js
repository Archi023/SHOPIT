import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loadUser } from "../../actions/userActions";

import Loader from '../layout/Loader'

const ProtectedRoute = ({ isAdmin, children }) => {
    const { isAuthenticated = false, loading = true, user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const Navigate = useNavigate();

    useEffect(() => {
        if(!user){
            dispatch(loadUser());
            
        }
    }, [isAuthenticated, loading]);

    if(loading) {return <Loader></Loader>}

    if(!loading && isAuthenticated){
        if(isAdmin === true && user.role !== 'admin'){
            return Navigate(`/`);
        }
        return children;
    } else {
        return Navigate(`/login`);
    }
};

export default ProtectedRoute;