import React, { useLayoutEffect, useRef, useState } from "react";
import e from "./Entrance.module.css";
import { NavLink, Navigate } from "react-router-dom";
import ComeIn from "./ComeIn/ComeIn";
import Registration from "./Registration/Registration";
import EntranceMethod from "./EntranceMethod/EntranceMethod";
import { useForm, FormProvider } from "react-hook-form";

const Entrance = ({
  onSubmitButton,
  isLoading,
  isError,
  setIsError,
  isExist,
  isRegistration,
  setIsRegistration
}) => {

  const [isVolRegistration, setIsVolRegistration] = useState(false);

  const entranceMethodsForm = useForm();
  const registrationVolForm = useForm();
  const registrationOrgForm = useForm();

  const { handleSubmit: handleEntranceSubmit } = entranceMethodsForm;
  const { handleSubmit: handleRegistrationVolSubmit } = registrationVolForm;
  const { handleSubmit: handleRegistrationOrgSubmit } = registrationOrgForm;

  const methods = isRegistration ? (isVolRegistration ? registrationVolForm : registrationOrgForm) : entranceMethodsForm;

  const startOptionRegion = "Выберите регион";
  const [selectedOptionRegion, setSelectedOptionRegion] = useState(
    startOptionRegion
  );

  const startOptionBirthday = "Дата рождения";
  const [selectedOptionBirthday, setSelectedOptionBirthday] = useState(
    startOptionBirthday
  );

  return (
    <main>
      <div className="container">
        <div className={e.entrance__wrapper}>
          <h2>Добро пожаловать</h2>
          <div className={e.navigator}>
            <NavLink
              className={isRegistration ? `${e.check}` : e.check + " " + e.active}
              onClick={() => {
                setIsRegistration(false);
              }}
            >
              Вход
            </NavLink>
            <NavLink
              className={isRegistration ? e.check + " " + e.active : `${e.check}`}
              onClick={() => {
                setIsRegistration(true);
              }}
            >
              Регистрация
            </NavLink>
          </div>
          <FormProvider {...methods}>
            <form
              className={e.form}
              onSubmit={isRegistration ? (isVolRegistration ? handleRegistrationVolSubmit(onSubmitButton) : handleRegistrationOrgSubmit(onSubmitButton)) : handleEntranceSubmit(onSubmitButton)}
            >
              {isRegistration ? (
                <Registration
                  startOptionRegion={startOptionRegion}
                  selectedOptionRegion={selectedOptionRegion}
                  setSelectedOptionRegion={setSelectedOptionRegion}
                  startOptionBirthday={startOptionBirthday}
                  selectedOptionBirthday={selectedOptionBirthday}
                  setSelectedOptionBirthday={setSelectedOptionBirthday}
                  isExist={isExist}
                  setIsVolRegistration={setIsVolRegistration}
                  isVolRegistration={isVolRegistration}
                />
              ) : (
                <ComeIn isError={isError} setIsError={setIsError}/>
              )}
              {isRegistration ? (
                isLoading ? <EntranceMethod textOfBtn={"Чуточку терпения😙"} background="#333333CC" /> : <EntranceMethod textOfBtn={"Зарегистрироваться"} />
              ) : (
                isLoading ? <EntranceMethod textOfBtn={"Чуточку терпения😙"} background="#333333CC"/> : <EntranceMethod textOfBtn={"Войти"} />
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
};

export default Entrance;
