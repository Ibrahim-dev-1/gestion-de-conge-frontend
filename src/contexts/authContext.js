import React , { createContext , useReducer } from 'react';
import { createNotification } from '../myFonctions'

let AuthStateContext = createContext();
let AuthDispatchContext = createContext();


// resolver
const rootReducer = (state, action ) => {
    switch(action.type){
        case "LOGIN":
            return {...state,isAuthentication: true , grade: action.payload.grade, token : action.payload.token };
        
        case "LOGOUT":
            return {isAuthentication: false, userId: '', grade: '', token :'' };
        
        default:
            return state;
    }
}


// provider 
const AuthenticationProvider = (props) => {
    const [authState, dispatch ] = useReducer(rootReducer, {
        isAuthentication: false,
        token: undefined,
        userId: '',
        grade: '',
    });

    return (
        <AuthStateContext.Provider value={authState} >
            <AuthDispatchContext.Provider value={dispatch} >
                { props.children }
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

// cusumer
const useAuthState = () =>{
    let state = React.useContext(AuthStateContext);
    if(state === undefined){
        console.log("le authStateContext doit s'utiliser dans un consumer");
        throw new Error("le state doit s'utiliser dans le context ")
    }
    return state;
}

const useAuthDispatch = () => {
    let dispatch = React.useContext(AuthDispatchContext);

    if(dispatch === undefined){
        console.log("le authDispatchContext doit s'utiliser dans un consumer");
        throw new Error("le dispatch doit s'utiliser dans le context ")
    }

    return dispatch;
}

const logout = (dispatch) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAuthentication");
    sessionStorage.removeItem("grade");
    sessionStorage.removeItem("userId");
    return dispatch({type:"LOGOUT"});
}

const login = (dispatch , AuthData) => {
    fetch("/",{
        method: "POST",
        body: JSON.stringify({
            query: `
                query{login(email: "${AuthData.email}", password:"${AuthData.password}"){ expirationToken grade token userId}}
            `
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function(response){
        return response.json();
    }).then(function(data){
        if(data.errors){
            sessionStorage.removeItem("isAuthentication");
            sessionStorage.removeItem("token");
            throw data.errors;
        }

        // si les informations sont correctes, alors 
        sessionStorage.setItem("isAuthentication", true);
        sessionStorage.setItem("token", data.data.login.token);
        sessionStorage.setItem("grade", data.data.login.grade);
        return dispatch({ type: "LOGIN" , payload: data.data.login })
    }).catch(function(errs){
        sessionStorage.removeItem("isAuthentication");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("grade");
        if(errs.length > 0){
            console.log("il y a erreur de login")
            return errs.map(err => createNotification("Login", "danger", err.message, "top-right"));
        }
    })
}

export {
    AuthenticationProvider,
    login,
    logout,
    useAuthState,
    useAuthDispatch,
}