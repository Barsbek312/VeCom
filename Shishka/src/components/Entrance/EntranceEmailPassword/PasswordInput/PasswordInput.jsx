import React, { useState, useEffect } from "react";
import pi from './PasswordInput.module.css';
import secrecy from './../../../../assets/images/entrance__icons/secrecy.svg';
import vision from './../../../../assets/images/entrance__icons/vision.svg';
import { useFormContext } from "react-hook-form";

const PasswordInput = ({ namePassword="password", watchingOfPass="", placeholderName="Пароль" }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, formState: { errors }, watch } = useFormContext();

    useEffect(() => {
        const passwordInputs = document.querySelectorAll(`.${pi.entrance__password}`);
        passwordInputs?.forEach((element) => {
            element.addEventListener("click", () => {
                element.focus();
            })
        })
    }, [showPassword])

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const check = watchingOfPass ? 
    {...register(namePassword, {
            required: "Пароль является обязательным полем",
            pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "Пароль должен содержать хотя бы одну цифру и букву, и иметь минимальную длину - 8 символов",
            },
            validate: (value) => value === watch(watchingOfPass) || "Пароли не совпадают",
    })} :
    {...register(null, {
        required: "Пароль является обязательным полем",
    })}
    // const check = () => {
    //     if(watchingOfPass) {
    //         if(namePassword === "password") {
    //             return {...register(namePassword, {
    //                 required: "Пароль является обязательным полем",
    //                 pattern: {
    //                     value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //                     message: "Пароль должен содержать хотя бы одну цифру и букву, и иметь минимальную длину - 8 символов",
    //                 },
    //                 validate: (value) => value === watch(watchingOfPass) || "Пароли не совпадают",
    //             })}
    //         } else {
    //             return {...register(null, {
    //                     required: "Пароль является обязательным полем",
    //                     pattern: {
    //                         value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //                         message: "Пароль должен содержать хотя бы одну цифру и букву, и иметь минимальную длину - 8 символов",
    //                     },
    //                     validate: (value) => value === watch(watchingOfPass) || "Пароли не совпадают",
    //             })} 
    //         }
    //     } else {
    //         return {...register(namePassword, {
    //             required: "Пароль является обязательным полем",
    //         })}
    //     }
    // }

    return (
        <>
            <div className={pi.password}>
                <input
                    {...check}
                    className={`${pi.entrance__password} entrance_input`}
                    type={showPassword ? "text" : "password"}
                    placeholder={errors?.password?.message || placeholderName}
                    style={{ borderColor: errors?.password ? "red" : "#4B6DE3" }}
                    autoComplete="current-password"
                />
                <button type="button" onClick={togglePasswordVisibility}>
                    <img src={showPassword ? vision : secrecy} alt="secrecy" />
                </button>
            </div>
        </>
    )
}

export default PasswordInput;