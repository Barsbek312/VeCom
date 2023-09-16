import React from "react";
import p from './Preloader.module.css';

const Preloader = () => {
    return (
        <div className={p.preloader_container}>
            <div className={p.preloader}>
                <div className={p.preloader_circle}></div>
            </div>
        </div>
    )
}

export default Preloader;