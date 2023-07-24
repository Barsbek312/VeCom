import React, { useEffect, useState } from 'react';
import reg from './Registration.module.css';
import { NavLink } from 'react-router-dom';
import Volunteer from './Volunteer/Volunteer';
import Organization from './Organization/Organization';
import EntraceEmailPassword from '../EntranceEmailPassword/EntranceEmailPassword';

const Registration = ({startOptionRegion,
    selectedOptionRegion,
    setSelectedOptionRegion,
    startOptionBirthday,
    selectedOptionBirthday,
    setSelectedOptionBirthday,
    isExist,
    setIsVolRegistration,
    isVolRegistration }) => {

    const listOfWathcingOfPass = ["password", "confirmPassword"];
    
    return(
        <div className={reg.form}>
            <div className={reg.navigator}>
                <NavLink onClick={() => {setIsVolRegistration(true)}} className={isVolRegistration ? reg.links + " " + reg.volunteer + " " + reg.active : reg.links + " " + reg.volunteer}>Волонтер</NavLink>
                <NavLink onClick={() => {setIsVolRegistration(false)}} className={isVolRegistration ? reg.links + " " + reg.org : reg.links + " " + reg.org + " " + reg.active}>Организация</NavLink>
            </div>
            {isVolRegistration ? 
            <Volunteer startOptionRegion={startOptionRegion}
                selectedOptionRegion={selectedOptionRegion}
                setSelectedOptionRegion={setSelectedOptionRegion}
                startOptionBirthday={startOptionBirthday}
                selectedOptionBirthday={selectedOptionBirthday}
                setSelectedOptionBirthday={setSelectedOptionBirthday}    
            />  
            : <Organization />}
            <EntraceEmailPassword listOfWathcingOfPass={listOfWathcingOfPass} isExist={isExist}/>
        </div>
    )
}

export default Registration;
