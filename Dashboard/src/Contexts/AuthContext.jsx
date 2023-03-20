import { createContext, useEffect, useState } from "react"
import api from "../services/Api"
export const AuthContext = createContext('')

function AuthProvider({ children }) {
    const [isLogged, setIsLogged] = useState(false)
    const [userName, setUserName] = useState('')
    const [picture, setPicture] = useState('')

    const verifyToken = async () => {
        const token = window.localStorage.getItem("token")
        if(token){
            const { data } = await api.post("/verifyToken", { token })
            api.defaults.headers.authorization = `Bearer ${token}`
            setUserName(data.userData.userName)
            setIsLogged(data.permission)
            setPicture(data.userData.picture)
        }
    }
    const handleLogin = async (userForm) => {
        const { data } = await api.post("/sign-in/", userForm)
        if (data.permission) {
            window.localStorage.setItem("token", data.token)
            api.defaults.headers.authorization = `Bearer ${data.token}`
            setIsLogged(data.permission)
            setUserName(data.userData.userName)
            setPicture(data.userData.picture)
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
        <AuthContext.Provider value={{ setIsLogged, isLogged, verifyToken, 
            handleLogin, handleLogOut,
            userName, setUserName,
            setPicture, picture}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider