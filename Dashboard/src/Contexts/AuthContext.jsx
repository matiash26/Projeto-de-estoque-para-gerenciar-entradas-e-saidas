import { createContext, useEffect, useState } from "react"
import api from "../services/Api"

export const AuthContext = createContext('')

function AuthProvider({ children }) {
    const [isLogged, setIsLogged] = useState(false)
    const [userName, setUserName] = useState('')
    const [picture, setPicture] = useState('')

    const verifyToken = async () => {
        const token = window.localStorage.getItem("token")
        if (token) {
            const { data } = await api.post("/verifyToken", { token })
            const permission = data.permission
            if(permission){
                setIsLogged(permission)
                setUserName(data.userData.userName)
                setPicture(data.userData.picture)
                api.defaults.headers.authorization = `Bearer ${token}`
            }
        }
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
            setPicture, picture
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider