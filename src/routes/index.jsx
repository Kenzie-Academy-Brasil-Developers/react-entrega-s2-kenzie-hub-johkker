import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home/index.jsx";
import Signup from "../pages/Signup/index.jsx";
import Login from "../pages/Login/index.jsx";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </Switch>
  );
}

export default Routes;
