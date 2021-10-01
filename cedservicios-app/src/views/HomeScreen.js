import React from 'react';
import { Link } from 'react-router-dom';
// Components
import { Carousel } from 'react-bootstrap';
import { PrevIcon } from '../components/ui/PrevIcon';
import { NextIcon } from '../components/ui/NextIcon';

export const HomeScreen = () => {
    return (
        <div>
            <section className="hero">
                <div className="contenedor-textos contenedor">
                    <h1 className="border-text" >COMPROMISO, EXPERIENCIA E INNOVACIÓN</h1>
                    <p>El trabajo en equipo, el compromiso y la pasion por lo que hacemos son la clave del éxito de todos los dias</p>
                    <Link className="fas fa-angle-double-down" to="./">
                    </Link>
                </div>
            </section>
            <section id="bienvenido-cedeira" className="contenedor">
                <h2 className="title-section">Bienvenido a Cedeira</h2>
                <p className="subtitle">soluciones <span className="subtitle-blue">informaticas</span></p>
                <div className="container-bienvenido">
                    <img className="ilustracion" src={`${process.env.PUBLIC_URL}/assets/quienessomos.svg`} alt="Cedeira Software Factory" />
                    <div className="relatos">
                        <div className="relato">
                            <p className="t-relato-top">
                                somos una empresa especializada en el desarrollo y consultoria de soluciones informáticas.
                                contamos no solo con personal altamente capacitado, sino con el conocimiento adquirido a través de cientos de implementaciones en las diversas áreas empresariales.
                            </p>
                        </div>
                        <div className="relato">
                            <p className="t-relato-botton">
                                esta conjunción de elementos nos permite satisfacer a nuestros clientes en tiempo y forma, permitiendo que obtengan la mejor tasa de retorno de la inversión
                            </p>
                        </div>
                    </div>
                </div>
                <Link to="./"
                    className="btn">
                    VER MAS
                </Link>
            </section>
            <section id="servicios-cedeira" className="servicios-section">
                <div className="contenedor">
                    <div className="contenedor-servicios">
                        <div className="servicio">
                            <i className="fas fa-code"></i>
                            <h3>desarrollos a medida</h3>
                            <p>
                                Desarrollamos software a medida en función de los requerimientos de las empresas, adaptamos el mismo a las necesidades operativas y comerciales para obtener un valor agregado.
                            </p>
                        </div>
                        <div className="servicio">
                            <i className="fas fa-cogs"></i>
                            <h3>software factory</h3>
                            <p>
                                Nuestra empresa se especializa en brindar servicios de software Factory principalmente a entidades financieras cumpliendo con los estándares del mercado actual.
                            </p>
                        </div>
                        <div className="servicio">
                            <i className="fas fa-cloud-download-alt"></i>
                            <h3>factura electronica</h3>
                            <p>
                                Este sitio le permite generar Facturas Electrónicas propias para gestionar el CAE a través de InterFacturas.
                                (la red de facturas electrónicas de InterBanking).
                            </p>
                        </div>
                        <div className="servicio">
                            <i className="fas fa-users"></i>
                            <h3>personal it</h3>
                            <p>
                                Brindamos servicios de personal IT para satisfacer las necesidades cambiantes y la gran demanda de personal tecnológico que existe actualmente.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="productos-cedeira" className="white-section">
                <div className="contenedor">
                    <h2 className="title-section">nuestros productos</h2>
                    <p className="subtitle"> desarrollados <span className="subtitle-blue">a medida</span> de las necesidades de nuestros clientes </p>
                    <div className="contenedor-productos">
                        <div className="producto">
                            <img src={`${process.env.PUBLIC_URL}/assets/portafolio/${1}.jpg`} alt="servicio-1" />
                            <h4>Sistema de Transferencias "implementación BCRA"</h4>
                        </div>
                        <div className="producto">
                            <img src={`${process.env.PUBLIC_URL}/assets/portafolio/${2}.jpg`} alt="servicio-2" />
                            <h4>Sistema de Administración y Presentación de Contenidos</h4>
                        </div>
                        <div className="producto">
                            <img src={`${process.env.PUBLIC_URL}/assets/portafolio/${3}.jpg`} alt="servicio-3" />
                            <h4>Sistema de Carga Centralizada de Tasas</h4>
                        </div>
                        <div className="producto">
                            <img src={`${process.env.PUBLIC_URL}/assets/portafolio/${4}.jpg`} alt="servicio-4" />
                            <h4>Sistema de Administración de Fondos Comunes de Inversión</h4>
                        </div>
                        <div className="producto">
                            <img src={`${process.env.PUBLIC_URL}/assets/portafolio/${5}.jpg`} alt="servicio-5" />
                            <h4>Plataforma de Inversiones</h4>
                        </div>
                        <div className="producto">
                            <img src={`${process.env.PUBLIC_URL}/assets/portafolio/${6}.jpg`} alt="servicio-6" />
                            <h4>Gestión de Stock de Servicios y Tarjetas</h4>
                        </div>
                    </div>
                </div>
            </section>
            <section id="busquedas-cedeira" className="busqueda-section">
                <div className="contenedor">
                    <h3 className="title-section t-white">busquedas</h3>
                    <p className="subtitle t-white">Si querés formar parte de nuestro equipo podés ver las búsquedas actuales que estamos realizando</p>
                    <Link to="./"
                        className="btn">
                        VER MAS
                    </Link>
                </div>
            </section>
            <section id="clientes-cedeira" className="clientes">
                <div className="contenedor">
                    <h3 className="title-section">clientes</h3>
                    <p className="subtitle">
                        Creemos que la mejor manera de conocernos, es a través de nuestros clientes. Ellos son nuestro mejor aval y les agradecemos la confianza que nos han brindado.
                    </p>
                    <Carousel
                        defaultActiveIndex={0}
                        controls={true}
                        interval={2000}
                        prevIcon={<PrevIcon />}
                        nextIcon={<NextIcon />}>
                        <Carousel.Item >
                            <div className="contenedor-clientes">
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${1}.jpg`}
                                    alt="cliente-1"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${2}.jpg`}
                                    alt="cliente-2"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${3}.jpg`}
                                    alt="cliente-3"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${4}.jpg`}
                                    alt="cliente-4"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${5}.jpg`}
                                    alt="cliente-5"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${6}.jpg`}
                                    alt="cliente-6"
                                    className="d-block" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item >
                            <div className="contenedor-clientes">
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${7}.jpg`}
                                    alt="cliente-7"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${8}.jpg`}
                                    alt="cliente-8"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${9}.jpg`}
                                    alt="cliente-9"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${10}.jpg`}
                                    alt="cliente-10"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${11}.jpg`}
                                    alt="cliente-11"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${12}.jpg`}
                                    alt="cliente-12"
                                    className="d-block" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="contenedor-clientes">
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${13}.jpg`}
                                    alt="cliente-13"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${14}.jpg`}
                                    alt="cliente-14"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${15}.jpg`}
                                    alt="cliente-15"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${16}.jpg`}
                                    alt="cliente-16"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${17}.jpg`}
                                    alt="cliente-17"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${18}.jpg`}
                                    alt="cliente-18"
                                    className="d-block" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="contenedor-clientes">
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${19}.jpg`}
                                    alt="cliente-19"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${20}.jpg`}
                                    alt="cliente-20"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${21}.jpg`}
                                    alt="cliente-21"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${22}.jpg`}
                                    alt="cliente-22"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${23}.jpg`}
                                    alt="cliente-23"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${24}.jpg`}
                                    alt="cliente-24"
                                    className="d-block" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="contenedor-clientes">
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${25}.jpg`}
                                    alt="cliente-25"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${26}.jpg`}
                                    alt="cliente-26"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${27}.jpg`}
                                    alt="cliente-27"
                                    className="d-block" />
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/clientes/${28}.jpg`}
                                    alt="cliente-28"
                                    className="d-block" />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </section>
        </div>
    )
}
