import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} 
      from 'react-router-dom'
import ListUserComponent from './components/ListUserComponent';
import CreateUserComponent from './components/CreateUserComponent';
import ViewUserComponent from './components/ViewUserComponent';
import Navbar from './components/navbar'; 
import Home from './components/home';

function App() {
  return (
    <div>
        <Router>
          <Navbar/>
                    <Switch> 
                      <Route path = "/add-user/:id" component = 
                          {CreateUserComponent}></Route>
                          <Route path = "/users" component = 
                              {ListUserComponent}></Route>
                          <Route path = "/view-user/:id" component = 
                              {ViewUserComponent}></Route>
                          <Route path="/" component=
                              {Home}></Route>
                         </Switch>
        </Router>
    </div>
    
  );
}

export default App;
