import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login } from './components/views/Login';
import { Register } from './components/views/Register';
import { Posts } from './components/views/Posts';
import { NavBar } from './components/fixed/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route exact path="/" component={Posts} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/posts" component={Posts} />
      </Router>
    </div>
  );
}

export default App;
