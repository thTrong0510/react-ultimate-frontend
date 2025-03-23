import "./components/todo/style.css"
import Header from "./components/layout/header"
import Footer from "./components/layout/footer"
import { Outlet } from "react-router-dom"
import { getAccountApi } from "./services/api.service"
import { notification, Spin } from "antd"
import { useContext, useEffect } from "react"
import { AuthContext } from "./components/context/auth.context"

const App = () => {

  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext)

  useEffect(() => { fetchUserInfo() }, [])

  const delay = (milSeconds) => {
    return new Promise((res, rej) => {
      setTimeout(() => { res() }, milSeconds)
    })
  }

  const fetchUserInfo = async () => {
    const res = await getAccountApi();
    await delay(3000)
    if (res?.data?.user) {
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  }

  return (
    (isAppLoading ?
      <div style={{
        position: "fixed",
        display: "flex",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"

      }}>
        <Spin />
      </div>
      :
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    )
  );
}

export default App;