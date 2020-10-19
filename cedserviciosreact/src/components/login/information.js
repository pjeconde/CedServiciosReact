import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));


export default function Information() {
    const classes = useStyles();

    return (
  

            <Grid item xs={12}>
        
                    <div style={{ width: '100%', backgroundColor: '#f3f3f3', marginTop: "60px" }} >
                        <div className={classes.cardDetails}>
                            <CardContent style={{ backgroundColor: '#f3f3f3' }} >
                                <Typography component="h1" variant="h5" align="center" style={{ marginBottom: "30px" }}>
                                    INFORMACION
                                </Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6}>

                                        <img
                                            src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                            alt="new"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" paragraph align="right">
                                            Si Ud. ya cuenta con un sistema de facturación, o utiliza una planilla Excel como herramienta de facturación y desea integrarlo al Régimen de Factura Electrónica, podemos ofrecerles diversas soluciones. Soporta los siguientes tipos de Factura Electrónica:
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph align="right">
                                            • Común (RG.2485 / RG.2904)
                                        </Typography>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </div>

                    </div>
       
            </Grid>

    );
}
