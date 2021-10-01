import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

export const RegimeGeneral = () => {

    const [tabKey, setTabKey] = useState('Comprobantes');

    return (
        <>
            <div className="b-example-divider"></div>
            <div className="container my-5 rounded-3 border shadow-lg">
                <Tabs
                    id="regimeGeneral"
                    variant="tabs"
                    activeKey={tabKey}
                    onSelect={(k) => setTabKey(k)}
                    className="mb-3 d-flex justify-content-center p-2 border-bottom">
                    <Tab eventKey="Comprobantes" title="Comprobantes">
                        <h3 className="fs-4 py-4 t-up text-center">comprobantes alcanzados</h3>
                        <ul className="fw-light">
                            <li>Facturas y Recibos clase “A”, “A” con la leyenda “PAGO EN C.B.U. INFORMADA” y/o “M”.</li>
                            <li>Facturas y Recibos clase “B”.</li>
                            <li>Facturas y Recibos clase “C”.</li>
                            <li>Facturas y Recibos clase “E”.</li>
                            <li>Facturas clase “T”.</li>
                            <li>Notas de crédito y notas de débito clase “A”, “A” con la leyenda “PAGO EN C.B.U. INFORMADA” y/o “M”.</li>
                            <li>Notas de crédito y notas de débito clase “B”.</li>
                            <li>Notas de crédito y notas de débito clase “C”.</li>
                            <li>Notas de crédito y notas de débito clase “E”.</li>
                            <li>Notas de crédito y notas de débito clase “T”.</li>
                        </ul>
                        <h3 className="fs-4 py-4 t-up text-center">comprobantes excluídos</h3>
                        <h6>Quedan excluídos del presente régimen:</h6>
                        <ul className="fs-6 text-left fw-light">
                            <li>
                                Los comprobantes emitidos por aquellos sujetos que realicen operaciones que requieren un tratamiento especial en la emisión de comprobantes, según lo dispuesto en el Anexo IV de la RG 1415/03, (agentes de bolsa y de mercado abierto, concesionarios del sistema nacional de aeropuertos, servicios prestados por el uso de aeroestaciones correspondientes a vuelos de cabotaje e internacionales, distribuidores de diarios, revistas y afines, etc.).
                            </li>
                            <li>
                                Las facturas o documentos equivalentes emitidos por los sujetos indicados en el Apartado A del Anexo I de la RG 1415/03, respecto de las operaciones allí detalladas, en tanto no se encuentren en las situaciones previstas en el Apartado B del mismo Anexo I.
                            </li>
                            <li>
                                Los comprobantes y documentos fiscales emitidos mediante “Controlador Fiscal”, y las notas de crédito emitidas por medio de dicho equipamiento como documentos no fiscales homologados y/o autorizados.
                            </li>
                            <li>
                                Los documentos equivalentes emitidos por entidades o sujetos especialmente autorizados por esta Administración Federal y/o la “Liquidación Primaria de Granos”.
                            </li>
                        </ul>
                        <h3 className="fs-4 py-4 t-up text-center">aclaración</h3>
                        <p className="fw-light fs-6">
                            La obligación de emisión de los comprobantes electrónicos, no incluye a las operaciones, no realizadas en el local, oficina o establecimiento, cuando la facturación se efectúa en el momento de la entrega de los bienes o prestación del servicio objeto de la transacción, en el domicilio del cliente o en un domicilio distinto al del emisor del comprobante.
                            Por ejemplo operaciones que se realicen a domicilio (ej. Plomeros) ó por ruteo.
                        </p>
                    </Tab>
                    <Tab eventKey="Sujetos" title="Sujetos">
                        <h3 className="fs-4 py-4 t-up text-center">sujetos obligados</h3>
                        <h6>Los siguientes sujetos se encuentran obligados a utilizar el régimen de factura electrónica:</h6>
                        <ul className="fs-6 text-left fw-light">
                            <li>
                                Sujetos Monotributistas: Quienes se encuentren inscriptos en las categorías H, I, J, K y L. Aquellos sujetos que sean Monotributistas por los comprobantes emitidos al Sector Público Nacional – que requieran Certificado Fiscal para Contratar con el Estado-.
                            </li>
                            <li>Sujetos Responsables Inscriptos en el Impuesto al Valor Agregado: Todos</li>
                            <li>Sujetos, cualquiera sea su condición frente al IVA, que:</li>
                            <li>desarrollen alguna de las actividades comprendidas en el Título III de la RG 3749/15</li>
                            <li>sean exportadores por la RG 2758.</li>
                            <li>sean comercializadores de Bienes Usados No Registrables (RG 3411</li>
                            <li>Sujetos exceptuados</li>
                            <li>Quienes realicen operaciones a domicilio (ej. Plomeros) y por ruteo.</li>
                        </ul>
                        <h3 className="fs-4 py-4 t-up text-center">sujetos excluidos</h3>
                        <h6 className="fs-6 text-left fw-light">Quienes se encuentren obligados a utilizar Controlador Fiscal.</h6>
                    </Tab>
                    <Tab eventKey="IncorporacionRegimen" title="Incorporación al Régimen">
                        <h3 className="fs-4 py-4 t-up text-center">Contribuyentes alcanzados Regímenes Especiales</h3>
                        <p className="fs-6 text-left fw-light">
                            Los contribuyentes obligados por Regímenes Especiales a emitir comprobantes electrónicamente, en caso de corresponder, deben informar a este Organismo, con una antelación de 5 días hábiles administrativos, la fecha a partir de la cual comenzarán a emitir dichos comprobantes. La comunicación se realizará mediante la página web de AFIP (www.afip.gob.ar), ingresando con clave fiscal al servicio “Regímenes de Facturación y Registración (REAR/RECE/RFI)”.
                            La incorporación del contribuyente será publicada en la página web de AFIP (www.afip.gov.ar).
                        </p>
                        <h3 className="fs-4 py-4 t-up text-center">Contribuyentes alcanzados por la Resolución General N° 3749/15</h3>
                        <p className="fs-6 text-left fw-light">
                            Los contribuyentes alcanzados por la obligación de emitir sus comprobantes electrónicos no deben realizar empadronamiento para comenzar a emitir factura electrónica.
                        </p>
                        <h3 className="fs-4 py-4 t-up text-center">Aclaración</h3>
                        <p className="fs-6 text-left fw-light">
                            En todos los casos, previo a la emisión de los comprobantes, deberán habilitar él/los punto/s de venta destinados a tal efecto.
                        </p>
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}