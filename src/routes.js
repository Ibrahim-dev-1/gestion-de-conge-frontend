import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import Configuration from './views/configuration';
import DetailsStatus from './views/detailsStatus';
import DetailsDivision from './views/detailsDivision';
import DetailsTypeConge from './views/detailsTypeConge';
import DetailsAgent from './views/detailsAgent';
import Agents from './views/agents';
import Agent from './views/agent';

const Routes = (props) =>{
    return (
            <React.Fragment>
                <Redirect exact from="/dashboard/" to="/dashboard/agents" />
                <Route path="/dashboard/agents" component={Agents} />
                <Route path="/dashboard/agent/add" component={Agent} />
                <Route path="/dashboard/configuration" component={Configuration} />
                <Route path="/dashboard/detailsStatus" component={DetailsStatus} />
                <Route path="/dashboard/detailsDivision" component={DetailsDivision} />
                <Route path="/dashboard/detailsTypeConge" component={DetailsTypeConge} />
                <Route path="/dashboard/agentDetails/:id" component={DetailsAgent} />
            </React.Fragment>
    )
}

export default Routes