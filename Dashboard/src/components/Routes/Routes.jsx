import { BrowserRouter as Router} from "react-router-dom"
import { AuthContext } from "../../Contexts/AuthContext"
import { useContext } from "react"
import GlobalProvider from "../../Contexts/GlobalContext"
import Private from "./Private"
import Login from "./Login"

function Routes() {
    const {isLogged} = useContext(AuthContext)
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
