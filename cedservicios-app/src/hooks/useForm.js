import { useState } from 'react';

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const reset = (newFormState = initialState) => {
        setValues(newFormState);
        setErrors({});
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
        setErrors({
            ...errors,
            [target.name]: ''
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
        if (target.value === '' || (re.test(target.value))) {
            setValues({
                ...values,
                [target.name]: target.value
            });
            setErrors({
                ...errors,
                [target.name]: ''
            });
        }
    }

    return {
        values,
        errors,
        setErrors,
        handleInputChange,
        handleDropdownChange,
        reset,
        handleInputCheck,
        handleInputNumericChange,
        setValues
    };

}