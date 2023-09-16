import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import e from "./Entrance.module.css";
import { NavLink, Navigate } from "react-router-dom";
import ComeIn from "./ComeIn/ComeIn";
import Registration from "./Registration/Registration";
import EntranceMethod from "./EntranceMethod/EntranceMethod";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";

const Entrance = ({
  onSubmitButton,
  isError,
  setIsError,
  isExistInReg,
  isRegistration,
  setIsRegistration,
  isExistInLogin
}) => {

  const [isVolRegistration, setIsVolRegistration] = useState(false);

  const entranceMethodsForm = useForm();
  const registrationVolForm = useForm();
  const registrationOrgForm = useForm();

  const { handleSubmit: handleEntranceSubmit } = entranceMethodsForm;
  const { handleSubmit: handleRegistrationVolSubmit } = registrationVolForm;
  const { handleSubmit: handleRegistrationOrgSubmit } = registrationOrgForm;

  const methods = isRegistration ? (isVolRegistration ? registrationVolForm : registrationOrgForm) : entranceMethodsForm;

  const startOptionRegion = "Select a region";
  const [selectedOptionRegion, setSelectedOptionRegion] = useState(
    startOptionRegion
  );

  const {loading} = useSelector(state => state.user);


  return (
    <main>
      <div className="container">
        <div className={e.entrance__wrapper}>
          <h2>Welcome</h2>
          <div className={e.navigator}>
            <NavLink
              className={isRegistration ? `${e.check}` : e.check + " " + e.active}
              onClick={() => {
                setIsRegistration(false);
              }}
            >
              Log in
            </NavLink>
            <NavLink
              className={isRegistration ? e.check + " " + e.active : `${e.check}`}
              onClick={() => {
                setIsRegistration(true);
              }}
            >
              Sign up
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
                  isExistInReg={isExistInReg}
                  setIsVolRegistration={setIsVolRegistration}
                  isVolRegistration={isVolRegistration}
                />
              ) : (
                <ComeIn isError={isError} setIsError={setIsError} isExistInLogin={isExistInLogin}/>
              )}
              {isRegistration ? (
                loading ? <EntranceMethod textOfBtn={"A little patience😙"} background="#333333CC" /> : <EntranceMethod textOfBtn={"Register"} />
              ) : (
                loading ? <EntranceMethod textOfBtn={"A little patience😙"} background="#333333CC"/> : <EntranceMethod textOfBtn={"Log in"} />
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
};

export default Entrance;
