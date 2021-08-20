import { useState } from 'react';

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {
        setValues(newFormState);
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    }

    const handleDropdownChange = (selectedOption, { name }) => {
        setValues({
            ...values,
            [name]: selectedOption
        });
    }

    const handleInputCheck = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.checked
        });
    }

    const handleInputNumericChange = ({ target }) => {
        const re = /^[0-9\b]+$/;
        if (target.value === '' || (re.test(target.value)))
            setValues({
                ...values,
                [target.name]: target.value
            });
    }

    return {
        values,
        handleInputChange,
        handleDropdownChange,
        reset,
        handleInputCheck,
        handleInputNumericChange
    };

}