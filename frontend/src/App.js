import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AccountCreated from "./componets2/AccountCreated";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Home, Signin } from "./componets2";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {" "}
        <Route path="/" exact={true} component={Signin} />
        <Route path="/quora" component={Home} />
        <Route path="/user/account_created" component={AccountCreated} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
