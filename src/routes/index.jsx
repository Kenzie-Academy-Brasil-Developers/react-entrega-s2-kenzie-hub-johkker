import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home/index.jsx";
import Signup from "../pages/Signup/index.jsx";
import Login from "../pages/Login/index.jsx";
import { useState, useEffect } from "react";



function Routes() {

  const [auth, setAuth] = useState(false);

  useEffect(()=> {
    const token = JSON.parse(localStorage.getItem("@KenzieHub:token"));
    if (token) {
      return setAuth(true);
    }
  }, [auth]);


  return (
    <Switch>
      <Route exact path="/">
        <Login auth={auth} setAuth={setAuth} />
      </Route>
      <Route exact path="/home">
        <Home auth={auth}/>
      </Route>
      <Route exact path="/signup">
        <Signup auth={auth} />
      </Route>
    </Switch>
  );
}

export default Routes;
