import React from "react";
import ECom from './EntranceMethod.module.css';

const EntranceMethod = ({textOfBtn, background=""}) => {
    return (
        <div className={ECom.wrapper}>
            <div className={ECom.comeIn}>
                <button type={"submit"} style={{backgroundColor: background ? background : null}}>{textOfBtn}</button>
            </div>
            <div className={ECom.or}>
                <div></div>
                <span>Или</span>
                <div></div>
            </div>
            <div className={ECom.alternatives}>
                <a>
                    <button type="button" className={ECom.google}>Google</button>
                </a>
                <a>
                    <button type="button" className={ECom.apple}>Apple</button>
                </a>
            </div>
        </div>
    )
}

export default EntranceMethod;