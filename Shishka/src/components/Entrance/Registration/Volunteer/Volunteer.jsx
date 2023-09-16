import React, { useEffect, useState } from "react";
import v from './Volunteer.module.css';
import '../../EntranceInput.css';
import arrow from './../../../../assets/images/common__images/arrow.svg';
import CustomSelect from '../../../common/CustomSelect/CustomSelect';
import { useFormContext } from "react-hook-form";
import DateComponent from "../../../common/Date/DateComponent";

const Volunteer = ({ startOptionRegion,
    selectedOptionRegion,
    setSelectedOptionRegion,
}) => {

    // region(begin)
    const { register, setValue, formState: { errors } } = useFormContext()

    useEffect(() => {
        if (selectedOptionRegion !== startOptionRegion) {
            let [region, district] = selectedOptionRegion.split(' (');
            district = district ? district.slice(0, -1) : null;
            setValue("region", region);
            setValue("city", district);
        } else {
            setValue("region", "");
            setValue("city", "");
        }
    }, [selectedOptionRegion])

    const optionsRegions = {
        "Kyrgyzstan": ["Chui", "Talas", "Issyk-Kul", "Jalal-Abad", "Naryn", "Osh", "Batken"],
        // "Казакстан": [],
        // "Узбекистан": [],
        // "Таджикистан": [],
        // "Азербайджан": [],
        // "Грузия": []
    }

    //region(end)

    const [years, setYears] = useState(Array.from({ length: 100 }, (_, index) => 2023 - index));

    const [months, setMonths] = useState([
        { name: "January", days: 31 },
        { name: "February", days: 28 },
        { name: "March", days: 31 },
        { name: "April", days: 30 },
        { name: "May", days: 31 },
        { name: "June", days: 30 },
        { name: "July", days: 31 },
        { name: "August", days: 31 },
        { name: "September", days: 30 },
        { name: "October", days: 31 },
        { name: "November", days: 30 },
        { name: "December", days: 31 }
    ])

    const startOptionBirthday = "Date of birth";
    const nameOfBirthday = "birthday"

    return (
        <div className={v.wrapper}>
            <div className={v.name__input}>
                <input
                    {...register('first_name', {
                        required: "The name is a required field",
                    })}
                    className="entrance_input"
                    type="text"
                    placeholder={errors["first_name"] ? errors["first_name"].message : "Name"}
                    style={{ borderColor: errors["first_name"] ? "red" : "#4B6DE3" }}
                />
            </div>
            <input
                {...register('second_name', {
                    required: "Last name is a required field",
                })}
                className="entrance_input"
                type="text"
                placeholder={errors["second_name"] ? errors["second_name"].message : "Surname"}
                style={{ borderColor: errors["second_name"] ? "red" : "#4B6DE3" }} />
            <div className={v.mobile}>
                <input
                    {...register('phoneNumber', {
                        required: "Does not correspond to the Kyrgyz number",
                        pattern: /^\+996[0-9]{9}$/
                    })}
                    className="entrance_input"
                    type="tel"
                    style={{ borderColor: errors["phoneNumber"] ? "red" : "#4B6DE3" }}
                    defaultValue="+996"
                    onInput={(e) => {
                        if (!e.target.value.startsWith('+996')) {
                            e.target.value = '+996' + e.target.value.substring(4);
                        }
                    }}
                />

            </div>
            <div className={v.select__wrapper}>
                <CustomSelect
                    startOption={startOptionRegion}
                    options={optionsRegions}
                    isNeedArrow={true}
                    arrow={arrow}
                    isNeedIcon={true}
                    icon={"region"}
                    paddingLeftInput={40}
                    paddingRightInput={15}
                    justifyContentText={"flex-start"}
                    selectedOption={selectedOptionRegion}
                    setSelectedOption={setSelectedOptionRegion}
                    zindex={15}
                />
            </div>
            <div className={v.birthday__wrapper}>
                <DateComponent setValue={setValue} setValueName={nameOfBirthday} startOptionDate={startOptionBirthday} years={years} months={months}/>
            </div>
        </div>
    )
}

export default Volunteer;


