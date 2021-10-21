import React from 'react'
import { Route, Switch } from "react-router-dom";
import Root from '../pages/root/root';
import Home from '../pages/home/Home';
import './App.css';
import Details from '../pages/details/Details';
import Create from '../pages/create/Create';

const Routes = () => {
    return (
        <main>
            <Switch>
                <Route exact path='/'>
                    <Root />
                </Route>

                <Route exact path='/home'>
                    <Home />
                </Route>

                <Route exact path="/home/details/:id" render={({ match }) => <Details id={match.params.id} />} />
                <Route exact path='/home/create'>
                    <Create />
                </Route>

            </Switch>
        </main>
    )
}

export default Routes
