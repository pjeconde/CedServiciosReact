import React from 'react';

export const BadgeStatus = ({ status, text }) => {
    return (
        <>
            <span className={`badge badge__status-${status}`}>{text}</span>
        </>
    )
}
