import React from 'react';
import { ReactComponent as NoDataSvg } from '../../images/no-data.svg';

export const EmptyState = () => {
    return (
        <div className='text-center mt-2'>
            <NoDataSvg />
            <p className='mt-3'><span>Oops!</span> No hay registros para mostrar</p>
        </div>
    )
}
