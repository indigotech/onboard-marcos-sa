import * as React from 'react';
import './App.css';
import { LoginPage } from './pages/LoginPage';
import Blank from "./pages/Blank";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage /> 
        </Route>
        <Router exact path="/blank">
          <Blank />
        </Router>
      </Switch>
    </Router>
  );
}


export default App;
