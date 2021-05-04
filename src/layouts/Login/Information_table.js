import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FadeIn from 'react-fade-in';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));
const style_font_subtitles = {
    fontSize: "16px",
    color: "#707070",
    marginLeft: "20px",
    marginBottom: "20px",
}
const style_font_titles = {
    fontSize: "24px",
    color: "#707070",
    marginTop: "0px",
    marginBottom: "20px",
    fontWeight: "500"
}
export default function InformationTable() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (

        <div className={classes.root} style={{ width: '100%', backgroundColor: '#e8ebeb', marginTop: "60px", alignContent: "center" }}>
            <div style={{ width: '100%', backgroundColor: '#e8ebeb', marginTop: "160px" }}>

                <Grid container spacing={12}>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={8} style={{ marginTop: "90px" }}>
                        <FadeIn>

                            <AppBar position="static" color="default" height="70px">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    textColor="white"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                    style={{ backgroundColor: '#fd8e00', color: "white" }}
                                >

                                    <Tab label="COMPROBANTES" {...a11yProps(0)} />
                                    <Tab label="SUJETOS" {...a11yProps(1)} />
                                    <Tab label="INCORPORACIÓN AL RÉGIMEN" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <Paper elevation={3} style={{padding:"50px"}}>
                                        <div style={{margin:"5px"}}>
                                            <Typography component="h1" variant="h5" align="center" style={style_font_titles}>
                                                Comprobantes alcanzados
                                            </Typography>
                                            <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles} >
                                                • Facturas y Recibos clase “A”, “A” con la leyenda “PAGO EN C.B.U. INFORMADA” y/o “M”.                            </Typography>
                                            <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles} >
                                                • Facturas y Recibos clase “B”.
                                            </Typography>
                                            <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles} >
                                                • Facturas y Recibos clase “C”.
                                            </Typography>
                                            <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles} >
                                                • Facturas y Recibos clase “E”.
                                            </Typography>
                                            <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles} >
                                                • Facturas clase “T”.
                                            </Typography>
                                            <Typography component="h1" variant="h5" align="center" style={style_font_titles}>
                                                Comprobantes excluídos
                                            </Typography>
                                            <Typography component="h1" variant="h5" align="left" style={style_font_subtitles}>
                                               • Notas de crédito y notas de débito clase “A”, “A” con la leyenda “PAGO EN C.B.U. INFORMADA” y/o “M”.
                                            </Typography>
                                            <Typography component="h1" variant="h5" align="left" style={style_font_subtitles}>
                                               • Notas de crédito y notas de débito clase “B”.
                                            </Typography>
                                            <Typography component="h1" variant="h5" align="left" style={style_font_subtitles}>
                                               • Notas de crédito y notas de débito clase “C”.
                                            </Typography>
                                            <Typography component="h1" variant="h5" align="left" style={style_font_subtitles}>
                                               • Notas de crédito y notas de débito clase “E”.
                                            </Typography>
                                            <Typography component="h1" variant="h5" align="left" style={style_font_subtitles}>
                                               • Notas de crédito y notas de débito clase “T”.
                                            </Typography>

                                        </div>
                                    </Paper>
                                </TabPanel>

                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <Paper elevation={3}>
                                        <Typography variant="subtitle1" paragraph align="left" style={style_font_subtitles} >
                                        • Común (RG.2485 / RG.2904)
                                        </Typography>
                                    </Paper>
                                </TabPanel>
                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    <Paper elevation={3}>
                                    sarasa
                                    </Paper>
                                </TabPanel>

                            </SwipeableViews>
                        </FadeIn>

                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}