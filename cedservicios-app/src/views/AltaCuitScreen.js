import React from 'react';
import {
    Container,
    // Form,
    // Button,
    // OverlayTrigger,
    // Popover,
} from 'react-bootstrap';
// import Select from 'react-select';
import moment from 'moment';
import validator from 'validator';

// import { useForm } from '../hooks/useForm';
import { FormCuit } from '../components/dashboardPrivate/admin/FormCuit';
// import { PopoverInfo } from '../components/ui/PopoverInfo';

const now = moment().format('YYYY-MM-DD');

export const AltaCuitScreen = () => {

    const formValues = {
        cuit: 0,
        razonSocial: '',
        calle: '',
        nro: '',
        piso: '',
        depto: '',
        sector: '',
        torre: '',
        manzana: '',
        localidad: '',
        codigoPostal: '',
        provincia: {},
        condIva: {},
        condIngBruto: {},
        nombreContacto: '',
        email: '',
        telefono: '',
        nroIngBruto: '',
        dateStart: now,
        gln: '',
        codigoInterno: '',
        recomendado: '',
        facturaElectronica: true,
        interfacturas: false,
        nroCertificado: '',
        afip: false,
        certificadoPropio: false
    }

    const isFormValid = () => {
        if (!formValues?.cuit || formValues?.cuit.trim().length < 11) {
            return false;
        }
        else if (!validator.isEmail(formValues?.email)) {
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            //Conectar con la api
            console.log(formValues);
        }
    }

    return (
        <div>
            <Container>
                <div className="col-sm-12 col-md-12 col-lg-10 col-xl-6" style={{ marginBottom: '200px' }}>
                    <div>
                        <FormCuit
                            key="altaCuit"
                            title="alta cuit"
                            tipo="alta"
                            handleSubmit={handleSubmit}
                            {...formValues}
                        />
                    </div>
                </div>
            </Container>
        </div>
    )
}
