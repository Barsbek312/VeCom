import React from 'react';
import EMP from './EntranceEmailPassword.module.css';
import { useFormContext } from 'react-hook-form';
import PasswordInput from './PasswordInput/PasswordInput';
import { useNavigate } from 'react-router-dom';


const EntraceEmailPassword = ({ listOfWathcingOfPass, isExistInReg = false, isExistInLogin = false }) => {

  const navigate = useNavigate();

  const { register, formState: { errors } } = useFormContext()
  const listOfPasswordInput = listOfWathcingOfPass.map((item, index) => {
    const lengthOfList = listOfWathcingOfPass.length;
    return index === 0 ?
      <PasswordInput namePassword={item} watchingOfPass={listOfWathcingOfPass[lengthOfList - (index + 1)]} />
      : <PasswordInput namePassword={item} watchingOfPass={listOfWathcingOfPass[lengthOfList - (index + 1)]} placeholderName={"Confirm the password"} />

  })

  const handleClickOnPolicy = () => {
    navigate(`/privacy_policy`);
  }

  return (
    <div className={EMP.inputs}>
      <div>
        <input
          {...register("email", {
            required: "Mail is a required field",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          })}
          autoComplete="username"
          name="email"
          className='entrance_input'
          type="text"
          placeholder={errors?.email?.message || "Почта"}
          style={{ borderColor: errors?.email ? "red" : "#4B6DE3" }}
        />
      </div>
      {listOfPasswordInput}
      {isExistInReg && <p className={EMP.notExist}>An account with such an email already exists</p>}
      {isExistInLogin && <p className={EMP.notExist}>There is no account with such data</p>}
      {listOfWathcingOfPass.length > 1 &&
        <div className={EMP.text__block}>
          <p>The password must contain at least one digit and letter, and have a minimum length of 8 characters.</p>
          <p>
          By clicking on the "Register" button, you accept our <strong onClick={handleClickOnPolicy}>Terms of Use and Privacy Policy</strong>
          </p>
        </div>}
    </div>
  )
}

export default EntraceEmailPassword;
