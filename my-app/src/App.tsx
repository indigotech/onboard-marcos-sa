import * as React from "react";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { UserListPage } from "./pages/UserListPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Router exact path="/userList">
          <UserListPage />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
