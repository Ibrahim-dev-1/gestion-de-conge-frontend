import React from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import Configuration from './views/configuration';
import DetailsStatus from './views/detailsStatus';
import DetailsDivision from './views/detailsDivision';
import Agent from './views/agent';

const Routes = (props) =>{
    return (
            <Switch>
                <Redirect exact from="/dashboard/" to="/dashboard/configuration" />
                <Route path="/dashboard/agents" component={Agent} />
                <Route path="/dashboard/configuration" component={Configuration} />
                <Route path="/dashboard/detailsStatus" component={DetailsStatus} />
                <Route path="/dashboard/detailsDivision" component={DetailsDivision} />
                
            </Switch>
    )
}

export default Routes