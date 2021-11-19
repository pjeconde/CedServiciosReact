import React from 'react';

export const Expanded = ({ data }) => {
    return (
        <>
            <pre>{JSON.stringify(data, null, 3)}</pre>
        </>
    )
}
