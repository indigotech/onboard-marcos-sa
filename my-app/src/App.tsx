import * as React from "react";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { UserListPage } from "./pages/UserListPage";
import { CreateUserPage } from "./pages/CreateUserPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserDetailPage } from "./pages/UserDetailPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/userList">
          <UserListPage />
        </Route>
        <Route path="/userDetail">
          <UserDetailPage />
        </Route>
        <Route exact path="/createUser">
          <CreateUserPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
