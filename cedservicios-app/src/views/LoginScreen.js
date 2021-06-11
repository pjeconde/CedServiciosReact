import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import validator from 'validator';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useForm } from '../hooks/useForm';
import { removeError, setError } from '../actions/ui';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#54aae3",
    color: 'white'
  },
  link: {
    textDecoration: 'none'
  }
}));

export const LoginScreen = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { msgError, label, loading } = useSelector(state => state.ui);

  const { values: formValues, handleInputChange } = useForm({
    email: 'pjeconde',
    password: '123456'
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      //dispatch(startLoginEmailPassword(email, password))
      console.log('Login');
    }
  }

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError('El email no es válido', 'email'));
      return false;
    }
    else if (password.length < 5) {
      dispatch(setError('La contraseña debe tener al menos 6 caracteres', 'password'));
      return false;
    }
    dispatch(removeError())
    return true;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <form
          onSubmit={handleLogin}
          className={classes.form}
          noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Usuario"
            name="email"
            value={email}
            onChange={handleInputChange}
            error={(label === 'email')}
            helperText={(label === 'email') ? msgError : ''}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            onChange={handleInputChange}
            error={(label === 'password')}
            helperText={(label === 'password') ? msgError : ''}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="./" variant="body2" className={classes.link}>
                Olvido la contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link to="./" variant="body2" className={classes.link}>
                No tenes una cuenta? Registrate!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}