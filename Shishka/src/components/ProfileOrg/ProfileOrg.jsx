import React, { useEffect, useState } from "react";
import po from './ProfileOrg.module.css';
import RegularPost from "../common/Post/RegularPost/RegularPost";
import CustomSelect from "../common/CustomSelect/CustomSelect";
import TextPost from "../common/Post/TextPost/TextPost";

const ProfileOrg = () => {

    const startOption = 1;
    const [selectedOption, setSelectedOption] = useState(`${startOption}`);
    const list = {
        2023: [1, 2, 3, 4, 5],
        2022: [1, 2, 3, 4],
        2021: [1, 2, 3]
    };
    const list2 = [1, 2, 3, 4];

    const listOfPosts = () => {
        let res = [];
        if(selectedOption === 2) {
            for(let i in list) {
                const posts = list[i].map((item, index) => (
                    <TextPost isHome={false} key={index}/>
                ))
                res.unshift(<div className={po.post__item}>
                    <h3>{i}г</h3>
                    {posts}
                </div>)
            }
        } else {
            res = list2.map((item, index) => (
                <RegularPost isHome={false}/>
            ))
        }
        return res;
    }

    useEffect(() => {
        listOfPosts();
    }, [selectedOption])

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
                                    Interact
                                </h2>
                            </div>
                            <div className={po.org_description}>
                                <ul className={po.header__list}>
                                    <li>
                                        <a>
                                            <span>32</span>
                                            <span>Объявлений</span>
                                        </a>
                                    </li>
                                    <li>
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
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={po.header__bottom}>
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
                    </div>
                </div>
            </div>
            <div className={po.posts}>
                {listOfPosts()}
            </div>
        </main>
    )
}

export default ProfileOrg;