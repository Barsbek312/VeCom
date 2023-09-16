import React from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import WrapperSelect from "../CustomSelect/WrapperSelect/WrapperSelect";
import { useState, useEffect } from "react";

const DateComponent = ({
    setValue,
    startOptionDate = "Выберите опцию",
    setValueName,
    isNeedToSelect = false,
    years = [],
    months = []
}) => {

    const [selectedOptionBirthday, setSelectedOptionBirthday] = useState(
        startOptionDate
    );

    const [isOpen, setIsOpen] = useState(false);

    const [selectedYear, setSelectedYear] = useState("Год");
    const [selectedMonth, setSelectedMonth] = useState("Месяц");
    const [selectedDay, setSelectedDay] = useState("День");

    const [days, setDays] = useState([]);

    useEffect(() => {

        setSelectedDay(selectedDay.trim());
        setSelectedMonth(selectedMonth.trim());
        setSelectedYear(selectedYear.trim());

        const selectedMonthIndex = months.findIndex(month => month.name === selectedMonth);
        const selectedMonthDays = months[selectedMonthIndex] ? months[selectedMonthIndex].days : 0;

        const daysArray = Array.from({ length: selectedMonthDays }, (_, index) => index + 1);
        setDays(daysArray);

        const viewOfSelectedMonth = selectedMonthIndex < 9 ? `0${selectedMonthIndex + 1}` : selectedMonthIndex + 1;
        const viewOfSelectedDay = selectedDay < 9 ? `0${selectedDay}` : selectedDay;

        setValue(setValueName, `${viewOfSelectedDay}.${viewOfSelectedMonth}.${selectedYear}`);

        if (selectedDay !== "День" && selectedMonth !== "Месяц" && selectedYear !== "Год") {
            setSelectedOptionBirthday(`${viewOfSelectedDay}.${viewOfSelectedMonth}.${selectedYear}`);
        }

    }, [selectedDay, selectedMonth, selectedYear, setValue]);

    useEffect(() => {
        if (selectedMonth !== "Месяц") {
            const maxDayOfMonth = months.find(month => month.name === selectedMonth.trim());
            if (selectedDay > maxDayOfMonth.days && selectedDay !== "День") {
                setSelectedDay(maxDayOfMonth.days.toString());
            }
        }
    }, [selectedMonth])

    let optionsDate = [
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
    ]

    return (
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
            startOption={startOptionDate}
            selectedOption={selectedOptionBirthday}
            justifyContentText={"flex-start"}
            listOfItems={optionsDate}
            zindex={10}
            isNeedSelect={isNeedToSelect}
        />
    )
}

export default DateComponent;