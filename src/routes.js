import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "Components/Loading";
import Home from "Pages/Home";

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

const ThemeDetails = Loadable({
    loader: () => import("Pages/ThemeDetails"),
    loading: Loading
});

const PraiseDetail = Loadable({
    loader: () => import("Pages/PraiseDetail"),
    loading: Loading
});

const SearchRusults = Loadable({
    loader: () => import("Pages/SearchRusults"),
    loading: Loading
});

const About = Loadable({
    loader: () => import("Pages/About"),
    loading: Loading
});

const QuickGuide = Loadable({
    loader: () => import("Pages/QuickGuide"),
    loading: Loading
});

const routes = [
    {
        path: "/",
        exact: true,
        component: Home
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
        path: "/themeDetails/:themeId",
        exact: true,
        component: ThemeDetails
    },
    {
        path: "/praiseDetail/:themeId",
        exact: true,
        component: PraiseDetail
    },
    {
        path: "/searchRusults/:keyword",
        exact: true,
        component: SearchRusults
    },
    {
        path: "/about",
        component: About
    },
    {
        path: "/quickguide",
        component: QuickGuide
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
