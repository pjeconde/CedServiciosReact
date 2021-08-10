import React from 'react';

export const Informacion = () => {
    return (
        <div>
            <div className="b-example-divider"></div>
            <div className="container my-5">
                <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="col-lg-6 p-3 p-lg-5 pt-lg-3">
                        <h3 className="display-5 fw-bold">Informacion</h3>
                        <p className="lead">
                            Si Ud. ya cuenta con un sistema de facturación, o utiliza una planilla Excel como herramienta de facturación y desea integrarlo al Régimen de Factura Electrónica, podemos ofrecerles diversas soluciones.
                            Soporta los siguientes tipos de Factura Electrónica:
                        </p>
                        <ul className="lead">
                            <li>Común (RG.2485 / RG.2904), </li>
                            <li>Bono Fiscal (Bienes de Capital)</li>
                            <li>Exportación (RG.2758/2010) </li>
                            <li>Turismo (RG.3971)</li>
                        </ul>
                        <p className="lead">Entorno Multi-CUIT, Multi-Unidad de Negocio, Multi-Usuario.</p>
                        <p className="lead">Cargue de manera rápida, fácil y segura su Factura Electrónica con nuestro Servicio Web. Facilitamos el cumplimiento del régimen normativo de la AFIP.</p>
                        <p className="lead">Para mas detalles sugerimos que se comuniquen desde Contacto o bien escribiendonos a contacto@cedeira.com.ar </p>
                        <p className="lead">Actividades alcanzadas por el Régimen de Factura Electrónica | Preguntas frecuentes</p>
                    </div>
                    <div className="col-lg-5 p-0 overflow-hidden shadow-lg">
                        <img className="rounded-lg-3 auth__info-img" src={`${process.env.PUBLIC_URL}/assets/factura.jpg`} alt="Cedeira Software Factory" />
                    </div>
                </div>
            </div>
        </div>
    )
}
