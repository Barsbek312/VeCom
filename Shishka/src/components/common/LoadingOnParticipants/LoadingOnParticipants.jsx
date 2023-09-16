import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import los from './LoadingOfSending.module.css';

const LoadingOnParticipants = () => {
    const {loadingOfSending} = useSelector(state => state.event);
    const [visible, setVisible] = useState(null);

    useEffect(() => {
        if(!loadingOfSending) {
            setTimeout(() => {
                setVisible(false);
            }, 1000)
        } else {
            setVisible(true);
        }
    }, [loadingOfSending])

    return (
        <div className={`${los.container} ${visible ? los.popUpVisible : los.popUpNonVisible}`}>
            {loadingOfSending ? <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none" className={los.loading}>
                <g clip-path="url(#clip0_1428_1158)">
                    <circle cx="14.5" cy="14.5" r="14.3" stroke="url(#paint0_linear_1428_1158)" stroke-width="0.4" />
                </g>
                <defs>
                    <linearGradient id="paint0_linear_1428_1158" x1="14.5" y1="0" x2="14.5" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                    </linearGradient>
                    <clipPath id="clip0_1428_1158">
                        <rect width="29" height="29" fill="white" />
                    </clipPath>
                </defs>
            </svg> 
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none" className={los.checkMark}>
                <path d="M6.44272 13C6.08254 13 5.74037 12.8549 5.48824 12.601L0.391696 7.46808C-0.130565 6.9421 -0.130565 6.0715 0.391696 5.54552C0.913957 5.01953 1.77839 5.01953 2.30065 5.54552L6.44272 9.71713L15.6994 0.394489C16.2216 -0.131496 17.086 -0.131496 17.6083 0.394489C18.1306 0.920474 18.1306 1.79107 17.6083 2.31706L7.3972 12.601C7.14507 12.8549 6.8029 13 6.44272 13Z" fill="white"/>
            </svg>}
        </div>
    )
}

export default LoadingOnParticipants;