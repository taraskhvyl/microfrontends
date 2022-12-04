import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import MarketingApp from "./components/MarketingApp";
import AuthApp from "./components/AuthApp";

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
});

export default () => {
  return(
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
      <div>
        <Header />
        <Switch>
          <Route path='/auth' component={AuthApp}></Route>
          <Route path='/' component={MarketingApp}></Route>
        </Switch>
      </div>
      </StylesProvider>
    </BrowserRouter>
    )
}
