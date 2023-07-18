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
    setSelectedOptionBirthday, }) => {

    const [isVolunteer, setIsVolunteer] = useState(true);

    const listOfWathcingOfPass = ["password", "confirmPassword"];
    
    return(
        <div className={reg.form}>
            <div className={reg.navigator}>
                <NavLink onClick={() => {setIsVolunteer(true)}} className={isVolunteer ? reg.links + " " + reg.volunteer + " " + reg.active : reg.links + " " + reg.volunteer}>Волонтер</NavLink>
                <NavLink onClick={() => {setIsVolunteer(false)}} className={isVolunteer ? reg.links + " " + reg.org : reg.links + " " + reg.org + " " + reg.active}>Организация</NavLink>
            </div>
            {isVolunteer ? 
            <Volunteer startOptionRegion={startOptionRegion}
                selectedOptionRegion={selectedOptionRegion}
                setSelectedOptionRegion={setSelectedOptionRegion}
                startOptionBirthday={startOptionBirthday}
                selectedOptionBirthday={selectedOptionBirthday}
                setSelectedOptionBirthday={setSelectedOptionBirthday}    
            />  
            : <Organization />}
            <EntraceEmailPassword listOfWathcingOfPass={listOfWathcingOfPass}/>
        </div>
    )
}

export default Registration;
