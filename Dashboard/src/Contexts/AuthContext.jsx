import { createContext, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import api from "../services/Api"

export const AuthContext = createContext('')

function AuthProvider({ children }) {
    const [isLogged, setIsLogged] = useState(false)
    const [userName, setUserName] = useState('')
    const [picture, setPicture] = useState('')
    const [alert, setAlert] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const verifyToken = async () => {
        const token = window.localStorage.getItem("token")
        if (token) {
            const { data } = await api.post("/verifyToken", { token })
            const permission = data.permission
            if (permission) {
                setPicture(data.userData.picture)
                setUserName(data.userData.userName)
                setIsLogged(data.permission)
                api.defaults.headers.authorization = `Bearer ${token}`
                navigate(location.pathname)
            }
        }
    }
    const handleLogin = async (user, password) => {
        const { data } = await api.post("/sign-in/", { user, password })
        if (!isLogged && data.permission) {
            window.localStorage.setItem("token", data.token)
            api.defaults.headers.authorization = `Bearer ${data.token}`
            setIsLogged(data.permission)
            setUserName(data.userData.userName)
            setPicture(data.userData.picture)
            navigate("/")
            return
        }
        setAlert(data)
    }
    const handleLogOut = () => {
        window.localStorage.removeItem("token")
        setIsLogged(false)
    }
    useEffect(() => {
        verifyToken()
    }, [])
    return (
        <AuthContext.Provider value={{
            setIsLogged, isLogged, verifyToken,
            handleLogOut, userName, setUserName,
            setPicture, picture, alert, setAlert, handleLogin
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider