import * as React from "react";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { UserListPage } from "./pages/UserListPage";
import { UserScreenPage } from "./pages/UserScreenPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserDetailPage } from "./pages/UserDetailPage";

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
        <Router path="/userDetail">
          <UserDetailPage />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
