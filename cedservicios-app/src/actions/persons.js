import { types } from "../types/types";


export const personStartAddNew = (person) => {
    return (dispatch) => {

        try {
            //Conectamos con la Api
            dispatch(personAddNew(person));

        } catch (error) {
            console.error(error);
        }

    }
}

const personAddNew = (person) => ({
    type: types.personAddNew,
    payload: person
});

export const personSetActive = (person) => ({
    type: types.personSetActive,
    payload: person
});

export const personClearActive = () => ({ type: types.personClearActive });

export const personStartUpdate = (person) => {

    return (dispatch) => {

        try {

            //Conectar con la api(PersonaController/Actualizar)
            dispatch(personUpdated(person));

        } catch (error) {
            console.error(error);
        }

    }

}

const personUpdated = (person) => ({
    type: types.personUpdated,
    payload: person
})