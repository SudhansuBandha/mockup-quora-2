import React from "react";
import { Route, Switch } from "react-router-dom";
import Profile from "./Profile/Profile";
import Test from "./HomeScreen/Test";
import NavBar from "./Navbar";
import { useUserContext } from "../context/user_account_context";

function Home() {
  const { userState } = useUserContext();
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path={"/quora/profile/user/:id"} component={Profile} />
        <Route path="/quora" exact component={Test} />
      </Switch>
    </div>
  );
}

export default Home;
