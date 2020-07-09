import React from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import Configuration from './views/configuration';

const Routes = (props) =>{
    return (
            <Switch>
                <Redirect exact from="/dashboard/" to="/dashboard/configuration" />
                {/* 
                <Route path="/division"  />
                <Route path="/calendrier" component={} /> */}
                <Route path="/dashboard/configuration" component={Configuration} />
                {/* <Route path="/compte" component={} />
                <Route path="/typeConge/" component={} />
                <Route path="/typeAbsence/" component={} />
                <Route path="/autorisationAbsence/" component={} />
                <Route path="/conge/" component={} />
                <Route path="/Status/" component={} /> */}
            </Switch>
    )
}

export default Routes