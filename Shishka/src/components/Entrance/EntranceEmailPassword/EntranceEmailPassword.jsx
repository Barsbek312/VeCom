import React from 'react';
import EMP from './EntranceEmailPassword.module.css';
import { useFormContext } from 'react-hook-form';
import PasswordInput from './PasswordInput/PasswordInput';

const EntraceEmailPassword = ({listOfWathcingOfPass}) => {
  const {register, formState: {errors}} = useFormContext()
  const listOfPasswordInput = listOfWathcingOfPass.map( (item, index) => {
    const lengthOfList = listOfWathcingOfPass.length; 
    return index === 0 ? 
      <PasswordInput namePassword={item} watchingOfPass={listOfWathcingOfPass[lengthOfList - (index + 1)]}/>
      : <PasswordInput namePassword={item} watchingOfPass={listOfWathcingOfPass[lengthOfList - (index + 1)]} placeholderName={"Подтвердите пароль"}/>

  })

  return (
    <div className={EMP.inputs}>
      <div>
        <input 
          {...register("email", {
            required: "Почта является обязательным полем",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Пожалуйста, введите корректный адрес электронной почты",
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
      { listOfWathcingOfPass.length > 1 &&
      <div className={EMP.text__block}>
          <p>Пароль должен содержать хотя бы одну цифру и букву, и иметь минимальную длину - 8 символов.</p>
          <p>
            Нажимая на кнопку "Зарегистрироваться", Вы принимаете наши <strong>Условия использования</strong> и <strong>Политику конфиденциальности</strong>
          </p>
      </div>}
    </div>
  )
}

export default EntraceEmailPassword;
