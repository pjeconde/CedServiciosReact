import React  from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/login/login_page'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {

  return (
     <main>
        <Switch>
        <Route path='/Login' component={LoginPage} />
        </Switch>
    </main>
  );
}

export default App;
