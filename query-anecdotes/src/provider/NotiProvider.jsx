import { useState } from "react";
import NotiContext from "../context";

export const NotiContextProvider = (props) => {
    const [notificationMessage,setNotificationMessage] = useState('');

    return (
        <NotiContext.Provider value={{notificationMessage,setNotificationMessage }}>
            {props.children}
        </NotiContext.Provider>
    )
}