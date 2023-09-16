import React, { useEffect, useState } from "react";
import po from './ProfileOrg.module.css';
import RegularPost from "../common/Post/RegularPost/RegularPost";
import CustomSelect from "../common/CustomSelect/CustomSelect";
import TextPost from "../common/Post/TextPost/TextPost";
import { useDispatch, useSelector } from "react-redux";
import { getEventsOfOrg } from "../../redux/events";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { useParams } from "react-router-dom";
import { getProfileOrg } from "../../redux/profile";

const ProfileOrg = () => {

    const { user } = useSelector(state => state.user);
    const params = useParams();

    const {profile} = useSelector(state => state.profile);
    const [listOfEvents, setListOfEvents] = useState([]);
    const [isMyProfile, setIsMyProfile] = useState(params?.id === "me");

    // добавить второй вариант поста

    const dispatch = useDispatch();

    const fetchData = async (id) => {
        try {
            const res = await dispatch(getProfileOrg({id}));
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(params?.id !== "me") fetchData(params.id)
    }, [])

    useEffect(() => {
        let condition, arr;
        if(params?.id !== "me") {
            condition = profile !== null && profile.events;
            arr = profile?.events;
        } else {
            condition = user !== null && user.org?.events;
            arr = user?.org?.events;
        }
        if (condition) {
            setListOfEvents(arr.map((item, index) => {
                const eventImages = [item.image1, item.image2, item.image3];
                return <RegularPost 
                        isHome={false} 
                        dateOfAdd={item.dateOfAdd} 
                        nameOfOrg={item.nameOfOrg} 
                        title={item.name} 
                        id={item.id} 
                        imagesUrl={eventImages}
                        views={item.view_count}
                        checkOfLike={item.liked_by_user}
                        like_id={item.like_id}  />
            }))
        }
    }, [profile, user])

    const startOption = 1;
    const [selectedOption, setSelectedOption] = useState(`${startOption}`);

    return (
        <main>
            <div className={po.header}>
                <div className="container">
                    <div className={po.header__top}>
                        <div className={po.header__ava}>
                            <div>
                                {/* <img src="" alt="" /> */}
                            </div>
                        </div>
                        <div className={po.header__info}>
                            <div className={po.org__title}>
                                <h2>
                                    {isMyProfile ? user?.first_name : profile?.first_name}
                                </h2>
                            </div>
                            <div className={po.org_description}>
                                <ul className={po.header__list}>
                                    {/* <li>
                                        <a>
                                            <span>{count}</span>
                                            <span>Объявлений</span>
                                        </a>
                                    </li> */}
                                    {/* <li>
                                        <a>
                                            <span>54</span>
                                            <span>Подписчики</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span>321</span>
                                            <span>Волонтеров</span>
                                        </a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* временное комментирование */}
                    {/* <div className={po.header__bottom}>
                        <ul className={po.header__btn_list}>
                            <li className={po.header__btn_item}>
                                <button>Подписаться</button>
                            </li>
                            <li className={po.header__btn_item}>
                                <button>Стать волонтером </button>
                            </li>
                            <li className={po.header__btn_item}>
                                <CustomSelect
                                    startOption={startOption}
                                    options={[1, 2]}
                                    isNeedArrow={false}
                                    borderSelect={true}
                                    justifyContentText={"center"}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption}
                                />
                            </li>
                        </ul>
                    </div> */}
                    {/* временное комментирование */}
                </div>
            </div>
            <div className={po.posts}>
                {/* временное */}
                <span>Posts: {isMyProfile ? user?.org?.events?.length : profile?.events?.length}</span>
                {/* временное */}
                <div className={po.wrapper__posts}>
                    {listOfEvents}
                </div>
            </div>
        </main>
    )
}

export default compose(WithAuthRedirect)(ProfileOrg);