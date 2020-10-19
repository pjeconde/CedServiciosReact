import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Login from './login';
import Information from './information';

class LoginPage extends Component {
  state = {
  };
  handleLogin() {
    // Aca se llama a la API
  };
  render() {

    return (
      <div>

      <Login/>
      
      <Information/>
      </div>
    );
  };
};

export default LoginPage;