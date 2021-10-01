import React from 'react';
import { Badge } from 'react-bootstrap';

export const BadgeStatus = ({ status = false, text = '' }) => {
    return (
        <>
            <Badge pill bg={status ? 'success' : 'danger'} >{text}</Badge>
        </>
    )
}
