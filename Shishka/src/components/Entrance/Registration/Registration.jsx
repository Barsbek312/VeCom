import React, { useEffect, useState } from 'react';
import reg from './Registration.module.css';
import { NavLink } from 'react-router-dom';
import Volunteer from './Volunteer/Volunteer';
import Organization from './Organization/Organization';
import EntraceEmailPassword from '../EntranceEmailPassword/EntranceEmailPassword';

const Registration = ({startOptionRegion,
    selectedOptionRegion,
    setSelectedOptionRegion,
    isExistInReg,
    setIsVolRegistration,
    isVolRegistration }) => {

    const listOfWathcingOfPass = ["password", "confirmPassword"];
    
    return(
        <div className={reg.form}>
            <div className={reg.navigator}>
                <NavLink onClick={() => {setIsVolRegistration(true)}} className={isVolRegistration ? reg.links + " " + reg.volunteer + " " + reg.active : reg.links + " " + reg.volunteer}>Volunteer</NavLink>
                <NavLink onClick={() => {setIsVolRegistration(false)}} className={isVolRegistration ? reg.links + " " + reg.org : reg.links + " " + reg.org + " " + reg.active}>Organization</NavLink>
            </div>
            {isVolRegistration ? 
            <Volunteer startOptionRegion={startOptionRegion}
                selectedOptionRegion={selectedOptionRegion}
                setSelectedOptionRegion={setSelectedOptionRegion}
            />  
            : <Organization />}
            <EntraceEmailPassword listOfWathcingOfPass={listOfWathcingOfPass} isExistInReg={isExistInReg}/>
        </div>
    )
}

export default Registration;
