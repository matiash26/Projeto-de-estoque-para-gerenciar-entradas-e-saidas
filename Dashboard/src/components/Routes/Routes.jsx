import { BrowserRouter as Router} from "react-router-dom"
import { useEffect, useState } from "react"
import GlobalProvider from "../../Contexts/GlobalContext"
import Private from "./Private"
import Login from "./Login"
import api from "../../services/Api"

function Routes() {
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const verifyToken = async () => {
            const token = window.localStorage.getItem("token")
            const { data } = await api.post('/verifyToken', {token:token})
            setIsLogged(data.permission)
            //a terminar
        }
        verifyToken()
    }, [])
    return (
        <div className="App">
            <GlobalProvider>
                <Router>
                    {isLogged ? <Private /> : <Login />}
                </Router>
            </GlobalProvider>
        </div>
    )
}

export default Routes
