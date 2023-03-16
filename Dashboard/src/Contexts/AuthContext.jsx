import { createContext, useEffect, useState } from "react"
import api from "../services/Api"
export const AuthContext = createContext('')

function AuthProvider({ children }) {
    const [isLogged, setIsLogged] = useState(false)
    const [userName, setUserName] = useState('')

    const verifyToken = async () => {
        const token = window.localStorage.getItem("token")
        if(token){
            const { data } = await api.post("/verifyToken", { token })
            setUserName(data.userData.userName)
            setIsLogged(data.permission)
        }
    }
    const handleLogin = async (userForm) => {
        const { data } = await api.post("/sign-in/", userForm)
        if (data.permission) {
            window.localStorage.setItem("token", data.token)
            setIsLogged(data.permission)
            setUserName(data.userData.userName)
        }
    }
    const handleLogOut = () => {
        window.localStorage.removeItem("token")
        setIsLogged(false)
    }
    useEffect(()=>{
        verifyToken()
    },[])
    return (
        <AuthContext.Provider value={{ setIsLogged, isLogged, verifyToken, handleLogin, handleLogOut,
            userName, setUserName }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider