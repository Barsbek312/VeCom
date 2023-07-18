import React from 'react';
import o from './Organization.module.css'

const Organization = () => {
    return (
        <div className={o.wrapper}>
            <div className={o.organization_input}><input type="text" className='entrance_input' placeholder='Название организации'/></div>
        </div>
    )
}

export default Organization;