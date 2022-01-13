import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { cuitReducer } from "../reducers/cuitReducer";
import { grillaReducer } from "../reducers/grillaReducer";
import { personaReducer } from "../reducers/personaReducer";
import { solicitudPermisoReducer } from "../reducers/solicitudPermisoReducer";
import { uiReducer } from "../reducers/uiReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    persona: personaReducer,
    grilla: grillaReducer,
    cuit: cuitReducer,
    solicitudPermiso: solicitudPermisoReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);