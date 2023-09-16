// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import n from  "./Notification.module.css"; 

// const Notification = ({ message, success }) => {
//     const [visible, setVisible] = useState(false);

//     useEffect(() => {
//         if (success !== null) {
//             setVisible(true);
//         }
//     }, [success]);

//     return (
//         <div className={`${n.notification} ${visible ? n.visible : ""} ${success ? n.success : n.error}`}>
//             {message}
//         </div>
//     );
// };



// Notification.propTypes = {
//     message: PropTypes.string.isRequired,
//     success: PropTypes.bool.isRequired,
// };

// export default Notification;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import n from  "./IsSuccess.module.css"; 

const IsSuccess = ({ message, success }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (success !== null) {
            setVisible(true);

            const timeout = setTimeout(() => {
                setVisible(false);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [success]);

    return (
        <div className={`${n.notification} ${visible ? n.visible : ""} ${success ? n.success : n.error}`}>
            {message}
        </div>
    );
};

IsSuccess.propTypes = {
    message: PropTypes.string.isRequired,
    success: PropTypes.bool.isRequired,
};

export default IsSuccess;
