import React, { useState, useEffect } from 'react';
import come from './ComeIn.module.css'
import '../EntranceInput.css';
import EntraceEmailPassword from '../EntranceEmailPassword/EntranceEmailPassword';
import CustomSelect from '../../common/CustomSelect/CustomSelect';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { resetRegistered } from '../../../redux/user.js';

const ComeIn = ({isError, setIsError}) => {
    
    const dispatch = useDispatch();
    const {setValue, getValues} = useFormContext();

    const listOfWathcingOfPass = ["password"];


    const startOption = "Выберите ваше положение";
    const [options, setOptions] = useState(["Волонтер", "Организатор"]);
    const [selectedStatus, setSelectedStatus] = useState(startOption);

    useEffect(() => {
        if (selectedStatus !== startOption) {
            setValue("status", selectedStatus);
            setIsError(false);
        } 
        const valueOfStatus = getValues().status || startOption;
        if(selectedStatus !== valueOfStatus) {
            setSelectedStatus(valueOfStatus);
        }

    }, [selectedStatus])

    useEffect(() => {
        dispatch(resetRegistered())
    }, [])

    return (
        <div className={come.form}>
            <div className={come.select__wrapper} style={{marginBottom: isError ? 30 : null}}>
                <CustomSelect 
                    options={options}
                    startOption={startOption}
                    isNeedArrow={true}
                    isNeedIcon={false}
                    paddingLeftInput={40}
                    paddingRightInput={15}
                    selectedOption={selectedStatus}
                    setSelectedOption={setSelectedStatus}
                    zindex={10}
                    isNeedSelect={true}
                />
                {isError && 
                <div className={come.error}>Выберите пожалуйста опцию для дальнейшего продолжения</div>}
            </div>
            <EntraceEmailPassword listOfWathcingOfPass={listOfWathcingOfPass}/>
            <div className={come.forget__password}>
                <a>Забыли пароль ?</a>
            </div>
        </div>
    )
}

export default ComeIn;