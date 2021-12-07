import React from 'react';

export const CheckStatus = ({ row, handleOnClick, disabled = false }) => {
    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input px-3 py-2"
                type="checkbox"
                role="switch"
                checked={row.estado.id === 1}
                onChange={() => handleOnClick(row)}
                disabled={disabled}
            />
        </div>
    )
}
