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
    nombreCuenta: null,
    email: null,
    cuit: null
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
        case types.authSetPreguntaSeguridad:
            return {
                ...state,
                preguntaSeguridad: action.payload
            };
        case types.authRemoverPreguntaSeguridad:
            return {
                ...state,
                preguntaSeguridad: null
            };
        case types.authSetRespuestaSeguridadValida:
            return {
                ...state,
                respuestaSeguridad: action.payload
            };
        case types.authRemoverRespuestaSeguridadValida:
            return {
                ...state,
                respuestaSeguridad: null
            };
        default:
            return state;
    }
}