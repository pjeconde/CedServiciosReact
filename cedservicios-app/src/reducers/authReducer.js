import { types } from "../types/types";

/*
const initialState = {
    checking: true,
    uid: null,
    username: null,
    cuit: null
}
*/

const initialState = {
    comprobacion: true,
    nombreCompleto: null,
    nombreCuenta: '',
    email: null,
    cuit: null,
    formSeguridad: {
        nombreCuenta: '',
        email: '',
        respuesta: '',
        respuestaValida: false,
        pregunta: '',
    }
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.authIngresarUsuario:
            return {
                ...state,
                nombreCompleto: action.payload.nombreCompleto,
                email: action.payload.email,
                nombreCuenta: action.payload.nombreCuenta,
                cuit: 20398724357,
                comprobacion: false,
            };
        case types.authFinalizarComprobacion:
            return {
                ...state,
                comprobacion: false
            };
        case types.authSalirUsuario:
            return {
                ...state,
                ...initialState,
                comprobacion: false,
            };
        case types.authSetFormSeguridad:
            return {
                ...state,
                formSeguridad: action.payload
            };
        case types.authRemoverFormSeguridad:
            return {
                ...state,
                formSeguridad: null
            };
        default:
            return state;
    }
}