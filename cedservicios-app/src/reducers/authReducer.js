import { types } from "../types/types";

const initialState = {
    comprobacion: true,
    nombreCompleto: null,
    nombreUsuario: '',
    email: null,
    cuit: null,
    formSeguridad: {
        nombreUsuario: '',
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
                nombreUsuario: action.payload.nombreUsuario,
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