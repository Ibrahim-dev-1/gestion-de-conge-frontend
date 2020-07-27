import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from './layouts/Login';
import PageNotFound from './layouts/PageNotFound';
import Dashboard from './layouts/Dashboard';
import CongeLayout from './layouts/CongeLayout';
import { useAuthState } from './contexts/authContext';

// importation de notre context 

const App = () => {
    const context = useAuthState();
    console.log(context);

    function PublicRoute({component,...rests}){
        return <Route 
            {...rests}
            render={function(props){
                if(
                    sessionStorage.getItem("isAuthentication") || 
                    sessionStorage.getItem("token")
                ){
                    return <Redirect 
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                }else{
                    return React.createElement(component, props);
                }
            }}  
        />
    }

    function PrivateRoute({component, ...rests}){
        return <Route 
            {...rests}
            render={function(props){
                // s'il s'agit d'un chef de division ou le superadmin ou le grh on le laisse passé
                if( sessionStorage.getItem("isAuthentication") && sessionStorage.getItem("token") && 
                (sessionStorage.getItem("grade") === "SUPERADMIN" || 
                sessionStorage.getItem("grade") === "GRH" || 
                sessionStorage.getItem("grade") === "CHEF DIVISION")){
                    return React.createElement(component, props);
                }else{
                    console.log("redirection sur la page de login")
                // si aucune de ses informations n'est correct alors on ramène la personne sur la page de login
                return <Redirect 
                        to={{
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }}
                    />
                }
            }}  
        />
    }

    function CongeRoute ({component, ...rests}){
        return <Route
            {...rests}
            render={function(props){
                if(sessionStorage.getItem("isAuthentication") && sessionStorage.getItem("token")){
                    return React.createElement(component, props)
                }else{
                    return <Redirect
                        exact
                        to={{
                            pathname: "/login",
                            state:{
                                from: props.location
                            }
                        }}
                    />
                }
            }}

        />
    }

    return (
        <Router>
            <Switch>
                <Redirect exact from="/" to="/dashboard" />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PublicRoute path="/login" component={Login} />
                <CongeRoute path="/congeLayout" component={CongeLayout} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    )
}
export default App;