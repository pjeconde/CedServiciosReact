import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import 'fontsource-roboto';
import FadeIn from 'react-fade-in';


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


export default function Information(props) {
    const classes = useStyles();
    const style_font_subtitles = {
        fontSize:"18px",
        color: "#707070"
    } 
    const style_font_titles = {
        fontSize:"28px",
        color: "#707070",
        marginBottom: "50px",
        letterSpacing:"6px",
        fontWeight: "500"
    } 
    return (


        <Grid item xs={12}>

            <div style={{ width: '100%', backgroundColor: '#e8ebeb', marginTop: "60px" }} >
                <div className={classes.cardDetails}>
                    <CardContent style={{ backgroundColor: '#f3f3f3' }} >
                        <Typography component="h1" variant="h5" align="center" style={style_font_titles}>
                            INFORMACION
                                </Typography>
                        <Grid container spacing={10}>
                            <Grid item xs={12} sm={6}>
                                <FadeIn>

                                    <img
                                        src={process.env.PUBLIC_URL + "/images/factura.jpg"}
                                        alt="new"
                                        align="right"
                                    />
                                </FadeIn>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FadeIn>
                                    
                                    <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles}>
                                        {props.texto}
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles} >
                                        • Común (RG.2485 / RG.2904)
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles} >
                                        • Bono Fiscal (Bienes de Capital)
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles}>
                                        • Exportación (RG.2758/2010)
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles}>
                                        • Turismo (RG.3971)
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles}>
                                        Entorno Multi-CUIT, Multi-Unidad de Negocio, Multi-Usuario.
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles}>
                                        Cargue de manera rápida, fácil y segura su Factura Electrónica con nuestro Servicio Web. Facilitamos el cumplimiento del régimen normativo de la AFIP.
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles}>
                                        Para mas detalles sugerimos que se comuniquen desde Contacto o bien escribiendonos a contacto@cedeira.com.ar
                                        </Typography>
                                       

                                </FadeIn>
                            </Grid>

                        </Grid>
                    </CardContent>
                </div>

            </div>

        </Grid>

    );
}
