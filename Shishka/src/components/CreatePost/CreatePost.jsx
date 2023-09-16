import React, { useEffect, useState } from "react";
import cp from './CreatePost.module.css';
import { useForm } from "react-hook-form";
import chooseImage from './../../assets/images/createPost__icons/choose_image.svg';
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import DateComponent from "../common/Date/DateComponent";
import { sendTheEvent } from "../../redux/event";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);
    const { loadingOfSending } = useSelector(state => state.event);

    const dispatch = useDispatch();

    const wrongText = "Вы не заполнили поле";

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [selectedImages, setSelectedImages] = useState([]);
    const [fetchSelectedImages, setFetchSelectedImages] = useState([]);

    const [isShowAccepting, setIsShowAccepting] = useState(false);

    const startOpionDate = "Event start date";
    const endOptionDate = "End date of the event";
    const nameOfStartDate = "dateOfStart";
    const nameOfEndDate = "dateOfEnd";

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    const currentYear = new Date().getFullYear();

    const [years, setYears] = useState(Array.from({ length: 10 }, (_, index) => currentYear + index));

    const [months, setMonths] = useState([
        { name: "January", days: 31 },
        { name: "February", days: isLeapYear(currentYear) ? 29 : 28 },
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

    const onSubmit = async (data, event) => {
        event.preventDefault();
        data.admin = `${user.url}`; // Надо будет попытаться отправить через аргумент или заранее добавить в data
        data.organization = `http://127.0.0.1:8000/organizations/${user?.org?.id}/`;
        const date = new Date();
        data.dateOfAdd = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
        data.hours = 0;
    
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }

        fetchSelectedImages.forEach((image, index) => {
            formData.append(`image${index + 1}`, image);
        });
    
        const res = await dispatch(sendTheEvent(formData));
        console.log(res);
        navigate('/eventsOfOrg');
    }
    

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);
            const readerArray = fileArray.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(readerArray)
                .then((results) => {
                    const updatedImages = [...selectedImages, ...results];
                    setFetchSelectedImages([...fetchSelectedImages, files[0]]);
                    setSelectedImages(updatedImages);
                })
                .catch((error) => {
                    console.error("Ошибка чтения файлов:", error);
                });
        }
    }


    return (
        <main>
            <div className={`${cp.wrapper} container`}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ul className={cp.images}>

                        {selectedImages && selectedImages.length < 3 && <li className={cp.chooseImage__wrapper}>
                            <input type="file" id="input__file" className={cp.chooseImage__input} onChange={handleImageUpload} multiple enctype="multipart/form-data" />
                            <label htmlFor="input__file">
                                <div className={cp.image__wrapper}>
                                    <img src={chooseImage} alt="choose file" />
                                </div>
                            </label>
                        </li>}
                        {selectedImages && selectedImages.map((image, index) => (
                            <li key={index} className={cp.chooseImage__wrapper + " " + cp.choosed__image} style={{ backgroundImage: `url(${image})` }}></li>
                        ))}
                    </ul>
                    <div>
                        <h3>
                            Title
                        </h3>
                        <textarea className={cp.input}
                            type="text"
                            placeholder={errors?.name ? errors.name.message : "Write your topic"}
                            {...register("name", {
                                required: wrongText
                            })}
                            style={{ border: errors?.name ? "1px solid red" : "1px solid #333333" }} />
                    </div>
                    <div>
                        <h3>
                            Description
                        </h3>
                        <textarea className={cp.input + " " + cp.description}
                            type="text"
                            // placeholder={errors?.description ? errors.description.message : "Напишите ваше описание"}
                            // {...register("text", {
                            //     required: wrongText
                            // })}
                            // style={{ border: errors?.description ? "1px solid red" : "1px solid #333333" }} 
                            placeholder="Write your description"
                            {...register("text")}
                        />
                    </div>
                    <div>
                        <h3>
                        Place
                        </h3>
                        <input className={cp.input}
                            type="text"
                            placeholder={errors?.place ? errors.place.message : "Write your place"}
                            {...register("place", {
                                required: wrongText
                            })}
                            style={{ border: errors?.place ? "1px solid red" : "1px solid #333333" }} />
                    </div>
                    <div>
                        <h3>Number of volunteers</h3>
                        <input {...register("numberOfVolunteers")}
                            className={cp.input}
                            type="text"
                            inputmode="numeric"
                            placeholder="Необязательно"
                            onKeyPress={(event) => {
                                const keyCode = event.which || event.keyCode;
                                const isDigit = /^[0-9]+$/.test(String.fromCharCode(keyCode));
                                if (!isDigit) {
                                    event.preventDefault();
                                }
                            }
                            }
                        />
                    </div>
                    <div className={cp.startDate}>
                        <h3>Event start date</h3>
                        <div>
                            <DateComponent setValue={setValue} setValueName={nameOfStartDate} startOptionDate={startOpionDate} isNeedToSelect={true} years={years} months={months} />
                        </div>
                    </div>
                    <div className={cp.endDate}>
                        <h3>End date of the event</h3>
                        <div>
                            <DateComponent setValue={setValue} setValueName={nameOfEndDate} startOptionDate={endOptionDate} years={years} months={months} />
                        </div>
                    </div>
                    {loadingOfSending ?
                        <button disabled className={cp.submit} style={{ background: "#333333CC" }}>A little patience😙</button> :
                        <button type="submit" className={cp.submit}>Add an event</button>
                    }
                    {/* Надо создать кастомную кнопку для загрузки и обычный */}
                </form>
            </div>
        </main>
    )
}

export default compose(WithAuthRedirect)(CreatePost);