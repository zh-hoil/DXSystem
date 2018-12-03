import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "Components/Loading";
import Home from "Pages/Home";

const Page1 = Loadable({
    loader: () => import("Pages/Page1"),
    loading: Loading
});

const NCMenu = Loadable({
    loader: () => import("Pages/NCMenu"),
    loading: Loading
});

const NCCMenu = Loadable({
    loader: () => import("Pages/NCCMenu"),
    loading: Loading
});

const ThemeSearch = Loadable({
    loader: () => import("Pages/ThemeSearch"),
    loading: Loading
});

const SearchHistory = Loadable({
    loader: () => import("Pages/SearchHistory"),
    loading: Loading
});

const ThemeDetials = Loadable({
    loader: () => import("Pages/ThemeDetials"),
    loading: Loading
});




const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/page1",
        component: Page1
    },
    {
        path: "/nc",
        component: NCMenu
    },
    {
        path: "/ncc",
        component: NCCMenu
    },
    {
        path: "/themeSearch",
        component: ThemeSearch
    },
    {
        path: "/searchHistory",
        component: SearchHistory
    },
    {
        path: "/themeDetials/:theme_id",
        exact: true,
        component: ThemeDetials
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
