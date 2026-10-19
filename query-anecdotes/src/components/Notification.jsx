import { useEffect } from "react"
import { useNoti } from "../hook/useNoti"

const Notification = () => {
  const {notificationMessage,setNotificationMessage}=useNoti()

//we need timer
//we need to know when things change or getback
//we have useEffect and setTimer

  useEffect(()=>{
    if(!notificationMessage) return 
   const timer= setTimeout(()=>{
        setNotificationMessage('')
    },5000)
    return ()=>clearTimeout(timer)
  },[notificationMessage])
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!notificationMessage) return null

  return <div data-testid="notification" style={style}>
  <span>{notificationMessage}</span>
  </div>
}

export default Notification
