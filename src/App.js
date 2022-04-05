import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListRoleComponent from './components/ListRoleComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateRoleComponent from './components/CreateRoleComponent';
import UpdateRoleComponent from './components/UpdateRoleComponent';
import ViewRoleComponent from './components/ViewRoleComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListRoleComponent}></Route>
                          <Route path = "/roles" component = {ListRoleComponent}></Route>
                          <Route path = "/add-role/:id" component = {CreateRoleComponent}></Route>
                          <Route path = "/view-role/:id" component = {ViewRoleComponent}></Route>
                          {/* <Route path = "/update-role/:id" component = {UpdateRoleComponent}></Route> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
