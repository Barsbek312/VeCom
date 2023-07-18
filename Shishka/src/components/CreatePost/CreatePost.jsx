import React, { useEffect, useState } from "react";
import cp from './CreatePost.module.css';
import { useForm } from "react-hook-form";
import chooseImage from './../../assets/images/createPost__icons/choose_image.svg';

const CreatePost = () => {

    const wrongText = "Вы не заполнили поле";

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedImages, setSelectedImages] = useState([]);

    const onSubmit = (event, data) => {
        event.preventDefault();
        console.log(data);
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
                    setSelectedImages(updatedImages);
                    console.log(selectedImages);
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
                        <li className={cp.chooseImage__wrapper}>
                            <input type="file" id="input__file" className={cp.chooseImage__input} onChange={handleImageUpload} multiple />
                            <label htmlFor="input__file">
                                <div className={cp.image__wrapper}>
                                    <img src={chooseImage} alt="choose file" />
                                </div>
                            </label>
                        </li>
                        {selectedImages && selectedImages.map((image, index) => (
                            <li key={index} className={cp.chooseImage__wrapper + " " + cp.choosed__image} style={{ backgroundImage: `url(${image})` }}></li>
                        ))}
                    </ul>
                    <div>
                        <h3>
                            Подзаголовок
                        </h3>
                        <textarea className={cp.input}
                            type="text"
                            placeholder={errors?.title ? errors.title.message : "Напишите ваш тему"}
                            {...register("title", {
                                required: "Вы не заполнили поле"
                            })}
                            style={{ border: errors?.title ? "1px solid red" : "1px solid #333333" }} />
                    </div>
                    <div>
                        <h3>
                            Описание
                        </h3>
                        <textarea className={cp.input + " " + cp.description}
                            type="text"
                            placeholder={errors?.description ? errors.description.message : "Напишите ваше описание"}
                            {...register("description", {
                                required: wrongText
                            })}
                            style={{ border: errors?.description ? "1px solid red" : "1px solid #333333" }} />
                    </div>
                    <div>
                        <h3>
                            Место
                        </h3>
                        <input className={cp.input}
                            type="text"
                            placeholder={errors?.place ? errors.place.message : "Напишите ваше место"}
                            {...register("place", {
                                required: wrongText
                            })}
                            style={{ border: errors?.place ? "1px solid red" : "1px solid #333333" }} />
                    </div>
                    <div>
                        <h3>Количество волонтеров</h3>
                        <input {...register("quantityOfVol")}
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
                    <button type="submit" className={cp.submit}>Добавить мероприятие</button>
                </form>
            </div>
        </main>
    )
}

export default CreatePost;