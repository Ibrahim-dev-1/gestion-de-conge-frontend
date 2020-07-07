import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './layouts/Login';
import Dashboard from './layouts/Dashboard';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/login" component={Login} />
                
            </Switch>
        </Router>
    )
}
export default App;