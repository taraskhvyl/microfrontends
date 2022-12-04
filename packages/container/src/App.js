import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Router, Switch } from "react-router-dom";
import router from "react-router-dom/es/Router";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { createBrowserHistory } from "history";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if(isSignedIn) {
      history.push('/dashboard');
    } else {
      history.push('/');
    }
  }, [isSignedIn]);


  return(
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
      <div>
        <Header onSignOut={() => setIsSignedIn(false)}  isSignedIn={isSignedIn} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path='/auth'>
              <AuthLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path='/dashboard'>
              {!isSignedIn && <Redirect to={'/'} />}
              <DashboardLazy />
            </Route>
            <Route path='/' component={MarketingLazy}></Route>
          </Switch>
        </Suspense>
      </div>
      </StylesProvider>
    </Router>
    )
}
