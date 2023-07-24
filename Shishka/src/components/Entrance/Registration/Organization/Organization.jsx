import React from 'react';
import o from './Organization.module.css'
import { useFormContext } from 'react-hook-form';

const Organization = () => {

    const { register, formState: {errors} } = useFormContext();

    return (
        <div className={o.wrapper}>
            <div className={o.organization_input}>
                <input 
                    {...register("name", {required: "Название организации является обязательным полем"})} 
                    type="text" 
                    className='entrance_input' 
                    placeholder={errors["name"] ? errors["name"].message : "Название организации"}
                    style={{borderColor: errors["name"] ? "red" : "#4B6DE3"}}/>
            </div>
        </div>
    )
}

export default Organization;