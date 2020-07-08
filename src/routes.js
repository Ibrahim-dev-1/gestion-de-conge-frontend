import React from 'react';
import {Switch, Route } from 'react-router-dom';


const Routes = () =>{
    return (
        <Switch>
            <Switch>
                <Route path="/dashboard/" component={} />
                <Route path="/division/" component={} />
                <Route path="/calendrier/" component={} />
                <Route path="/compte/" component={} />
                <Route path="/typeConge/" component={} />
                <Route path="/typeAbsence/" component={} />
                <Route path="/autorisationAbsence/" component={} />
                <Route path="/conge/" component={} />
                <Route path="/Status/" component={} />
            </Switch>
            
        </Switch>
    )
}