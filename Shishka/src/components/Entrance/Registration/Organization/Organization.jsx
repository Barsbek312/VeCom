import React from 'react';
import o from './Organization.module.css'
import { useFormContext } from 'react-hook-form';

const Organization = () => {

    const { register, formState: {errors} } = useFormContext();

    return (
        <div className={o.wrapper}>
            <div className={o.organization_input}>
                <input 
                    {...register("first_name", {required: "The name of the organization is a mandatory field"})} 
                    type="text" 
                    className='entrance_input' 
                    placeholder={errors["first_name"] ? errors["first_name"].message : "Name of the organization"}
                    style={{borderColor: errors["first_name"] ? "red" : "#4B6DE3"}}/>
            </div>
        </div>
    )
}

export default Organization;