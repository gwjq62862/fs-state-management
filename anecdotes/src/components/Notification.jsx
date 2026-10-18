import { useEffect } from "react"
import { useNoti, useNotiAction } from "../store"

const Notification = () => {
  const noti = useNoti()
  const setNoti = useNotiAction()

  useEffect(() => {
    if (!noti) return

    const timer = setTimeout(() => {
      setNoti(null)
    }, 5000)
    return () => clearTimeout(timer)
  }, [noti, setNoti])

const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  if (!noti) return null
  return (
  <div style={style} data-testid="notification">
    {noti}
</div>
  )
}


export default Notification
