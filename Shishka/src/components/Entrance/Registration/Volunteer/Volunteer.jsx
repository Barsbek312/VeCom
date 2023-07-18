import React, { useEffect, useState } from "react";
import v from './Volunteer.module.css';
import '../../EntranceInput.css';
import arrow from './../../../../assets/images/common__images/arrow.svg';
import CustomSelect from '../../../common/CustomSelect/CustomSelect';
import { useFormContext } from "react-hook-form";
import WrapperSelect from "../../../common/CustomSelect/WrapperSelect/WrapperSelect";

const Volunteer = ({startOptionRegion, 
    selectedOptionRegion, 
    setSelectedOptionRegion, 
    startOptionBirthday,
    selectedOptionBirthday,
    setSelectedOptionBirthday}) => {

    // region(begin)
    const { register, setValue, formState: {errors} } = useFormContext()

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
        "Кыргызстан": ["Чуй", "Талас", "Иссык-Куль", "Джалал-Абад", "Нарын", "Ош", "Баткен"],
        "Казакстан": [],
        "Узбекистан": [],
        "Таджикистан": [],
        "Азербайджан": [],
        "Грузия": []
    }

    //region(end)

    
    // birthday(begin)
    const [isOpen, setIsOpen] = useState(false);

    const [selectedYear, setSelectedYear] = useState("Год");
    const [selectedMonth, setSelectedMonth] = useState("Месяц");
    const [selectedDay, setSelectedDay] = useState("День");

    const years = Array.from({ length: 100 }, (_, index) => 2023 - index);

    const months = [
        { name: "Январь", days: 31 },
        { name: "Февраль", days: 28 },
        { name: "Март", days: 31 },
        { name: "Апрель", days: 30 },
        { name: "Май", days: 31 },
        { name: "Июнь", days: 30 },
        { name: "Июль", days: 31 },
        { name: "Август", days: 31 },
        { name: "Сентябрь", days: 30 },
        { name: "Октябрь", days: 31 },
        { name: "Ноябрь", days: 30 },
        { name: "Декабрь", days: 31 }
    ];;

    const [days, setDays] = useState([]);

    useEffect(() => {

        setSelectedDay(selectedDay.replace(/\s/g, ''));
        setSelectedMonth(selectedMonth.replace(/\s/g, ''));
        setSelectedYear(selectedYear.replace(/\s/g, ''));

        const selectedMonthIndex = months.findIndex(month => month.name === selectedMonth);
        const selectedMonthDays = months[selectedMonthIndex] ? months[selectedMonthIndex].days : 0;

        const daysArray = Array.from({ length: selectedMonthDays }, (_, index) => index + 1);
        setDays(daysArray);

        const viewOfSelectedMonth = selectedMonthIndex < 9 ? `0${selectedMonthIndex+1}` : selectedMonthIndex+1;
        const viewOfSelectedDay = selectedDay < 9 ? `0${selectedDay}` : selectedDay;

        setValue("birthday", `${viewOfSelectedDay}.${viewOfSelectedMonth}.${selectedYear}`);

        if(selectedDay !== "День" && selectedMonth !== "Месяц" && selectedYear !== "Год"){
            setSelectedOptionBirthday(`${viewOfSelectedDay}.${viewOfSelectedMonth}.${selectedYear}`);
        } 

      }, [ selectedDay, selectedMonth, selectedYear, setValue]);

      useEffect(() => {
        if(selectedMonth !== "Месяц") {
            const maxDayOfMonth = months.find(month => month.name === selectedMonth.replace(/\s/g, ''));
            if(selectedDay > maxDayOfMonth.days && selectedDay !== "День") {
                setSelectedDay(maxDayOfMonth.days.toString());
            }
        }
      }, [selectedMonth])
      

    let optionsBirthday = [
        <CustomSelect
            options={years.map((year) => year.toString())}
            parrentIsOpen={isOpen}
            startOption="Год"
            isNeedArrow={true}
            isNeedIcon={false}
            paddingLeftInput={10}
            paddingRightInput={15}
            borderSelect={true}
            justifyContentText={"flex-start"}
            selectedOption={selectedYear}
            setSelectedOption={setSelectedYear}
        />,
        <CustomSelect
            options={months.map((month) => month.name)}
            parrentIsOpen={isOpen}
            startOption="Месяц"
            isNeedArrow={true}
            isNeedIcon={false}
            paddingLeftInput={10}
            paddingRightInput={15}
            borderSelect={true}
            justifyContentText={"flex-start"}
            selectedOption={selectedMonth}
            setSelectedOption={setSelectedMonth}
        />,
        <CustomSelect
            options={days.map((day) => day.toString())}
            parrentIsOpen={isOpen}
            startOption="День"
            isNeedArrow={true}
            isNeedIcon={false}
            paddingLeftInput={10}
            paddingRightInput={15}
            borderSelect={true}
            justifyContentText={"flex-start"}
            selectedOption={selectedDay}
            setSelectedOption={setSelectedDay}
            absenceMessage="Выберите месяц, чтобы выбрать день"
        />,
    ];
    // birthday(end)

    return (
        <div className={v.wrapper}>
            <div className={v.name__input}>
                <input
                    {...register('first_name', {
                        required: "Имя является обязательным полем",
                    })}
                    className="entrance_input"
                    type="text"
                    placeholder={errors["first_name"] ? errors["first_name"].message : "Имя"}
                    style={{borderColor: errors["first_name"] ? "red" : "#4B6DE3"}}
                     />
            </div>
            <input
                {...register('second_name', {
                    required: "Фамилия является обязательным полем",
                })}
                className="entrance_input"
                type="text"
                placeholder={errors["second_name"] ? errors["second_name"].message : "Фамилия"}
                style={{borderColor: errors["second_name"] ? "red" : "#4B6DE3"}} />
            <div className={v.mobile}>
                <input
                    {...register('phoneNumber')}
                    className="entrance_input"
                    type="text"
                    placeholder="Мобильный"
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
                <WrapperSelect
                    alignFlex={true}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    paddingLeftInput={40}
                    paddingRightInput={15}
                    borderSelect={false}
                    isNeedIcon={true}
                    icon={"birthday"}
                    isNeedArrow={true}
                    setSelectedOption={setSelectedOptionBirthday}
                    startOption={startOptionBirthday}
                    selectedOption={selectedOptionBirthday}
                    justifyContentText={"flex-start"}
                    listOfItems={optionsBirthday}
                    zindex={10}
                />

            </div>
        </div>
    )
}

export default Volunteer;


