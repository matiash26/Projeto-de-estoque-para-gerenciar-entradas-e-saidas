import { createContext, useState } from "react"

export const AuthContext = createContext('')

function AuthProvider({ children }) {
    const [isLogged, setIsLogged] = useState(false)
    return (
        <AuthContext.Provider value={{ setIsLogged, isLogged }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider