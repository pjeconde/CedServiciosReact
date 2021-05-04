import React, { Component } from 'react';
import Login from './login';
import Information from './information';
import Typography from '@material-ui/core/Typography';
import InformationTable from './Information_table';
import FadeIn from 'react-fade-in';
import Grid from '@material-ui/core/Grid';

class LoginPage extends Component {
  state = {
  };
  handleLogin() {
    // Aca se llama a la API
  };
  render() {
    const style_font_subtitles = {
      fontSize:"35px",
      color: "#707070",
      marginTop: "120px",
      marginLeft: "70px",
      marginBottom: "120px",
      fontWeight: "700"
    } 
    return (
      <div>
        <FadeIn>
            <Login />
        </FadeIn>
            <Information texto="Si Ud. ya cuenta con un sistema de facturación, o utiliza una planilla Excel como herramienta de facturación y desea integrarlo al Régimen de Factura Electrónica, podemos ofrecerles diversas soluciones. Soporta los siguientes tipos de Factura Electrónica:"/>
            <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles} >
              REGIMEN GENERAL
            </Typography>
            <InformationTable/>

      </div>
    );
  };
};

export default LoginPage;