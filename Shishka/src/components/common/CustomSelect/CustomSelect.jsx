
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import cs from './CustomSelect.module.css';
import WrapperSelect from './WrapperSelect/WrapperSelect';
import arrow from './../../../assets/images/common__images/arrow.svg';

const CustomSelect = ({
    options,
    parrentIsOpen = true,
    startOption,
    isNeedArrow = false,
    isNeedIcon = false,
    icon = "",
    paddingLeftInput = 0,
    paddingRightInput = 0,
    borderSelect = false,
    justifyContentText = "flex-start",
    selectedOption = "",
    setSelectedOption = () => { },
    zindex = 2,
    isNeedSelect = false,
    absenceMessage="Пока ничего нет. Прошу прощения за предоставленные неудобства",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSelectedOption, setIsSelectedOption] = useState(false);


    useEffect(() => {
        if(!parrentIsOpen) {
            setIsOpen(false);
        }
    }, [parrentIsOpen])

    const handleOptionClick = useCallback((option) => {
        setIsSelectedOption(true);
        setSelectedOption(option);
    }, [setSelectedOption]);

    const handleSubSelectionClick = useCallback(
        (select, subselect = "") => {
            setSelectedOption(`${select} ${subselect && `(${subselect})`}`);
            setIsSelectedOption(false);
            setIsOpen(false);
        },
        [setSelectedOption]
    );

    const handleBackClick = useCallback(() => {
        setIsSelectedOption(false);
    }, []);

    const listOfItems = useMemo(() => {
        if (Array.isArray(options)) {
            let selects = options || [];
            return selects.length ? (
                selects.map((select, index) => (
                    <li
                        key={index}
                        className={`${cs.option} ${isOpen ? cs.open : ""}`}
                        onClick={() => handleSubSelectionClick(select)}
                    >
                        {select}
                    </li>
                ))
            ) : (
                <li className={`${cs.option} ${cs.option_no} ${isOpen ? cs.open : ""}`}>
                    {absenceMessage}
                </li>
            );
        } else {
            if (isSelectedOption) {
                let selects = options[selectedOption] || [];
                return selects.length ? (
                    <>
                        <li
                            className={`${cs.option} ${cs.arrow_back}`}
                            onClick={handleBackClick}
                        >
                            Назад
                            <div>
                                <img src={arrow} alt="arrow_back" />
                            </div>
                        </li>
                        {selects.map((district, index) => (
                            <li
                                key={index}
                                className={`${cs.option} ${isOpen ? cs.open : ""}`}
                                onClick={() => handleSubSelectionClick(selectedOption, district)}
                            >
                                {district}
                            </li>
                        ))}
                    </>
                ) : (
                    <>
                        <li
                            className={`${cs.option} ${cs.arrow_back}`}
                            onClick={handleBackClick}
                        >
                            Назад
                            <div>
                                <img src={arrow} alt="arrow_back" />
                            </div>
                        </li>
                        <li className={`${cs.option} ${cs.option_no} ${isOpen ? cs.open : ""}`}>
                            {absenceMessage}
                        </li>
                    </>
                );
            } else {
                let selects = Object.keys(options);
                return selects.length ? (
                    selects.map((select, index) => (
                        <li
                            key={index}
                            className={`${cs.option} ${isOpen ? cs.open : ""}`}
                            onClick={() => handleOptionClick(select)}
                        >
                            {select}
                        </li>
                    ))
                ) : (
                    <li className={`${cs.option} ${cs.option_no} ${isOpen ? cs.open : ""}`}>
                        {absenceMessage}
                    </li>
                );
            }
        }
    }, [
        options,
        isOpen,
        isSelectedOption,
        selectedOption,
        handleOptionClick,
        handleSubSelectionClick,
        handleBackClick,
    ]);


    return (
        <WrapperSelect
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            startOption={startOption}
            options={options}
            paddingLeftInput={paddingLeftInput}
            paddingRightInput={paddingRightInput}
            borderSelect={borderSelect}
            isNeedIcon={isNeedIcon}
            icon={icon}
            isNeedArrow={isNeedArrow}
            selectedOption={selectedOption}
            justifyContentText={justifyContentText}
            listOfItems={listOfItems}
            setSelectedOption={setSelectedOption}
            zindex={zindex}
            isNeedSelect={isNeedSelect}
        />
    );
};

export default CustomSelect;
