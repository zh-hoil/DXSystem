import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "Components/Loading";
import Index from "Pages/Index";

const Home = Loadable({
    loader: () => import("Pages/Home"),
    loading: Loading
});


const routes = [
    {
        path: "/",
        exact: true,
        component: Index
    },
    {
        path: "/home",
        exact: true,
        component: Home
    }
];
const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} />
        )}
    />
);

const RouteConfig = () => (
    <Router>
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
            <Route
                component={infor => <NotFound location={infor.location} />}
            />
        </Switch>
    </Router>
);
export default RouteConfig;
