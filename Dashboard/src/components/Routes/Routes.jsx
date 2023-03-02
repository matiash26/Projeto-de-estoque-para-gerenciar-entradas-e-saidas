import { BrowserRouter as Router} from "react-router-dom"
import GlobalProvider from "../../Contexts/GlobalContext"
import Pages from "./Pages"
import Auth from "./Auth"

function Routes() {
    return (
        <div className="App">
            <GlobalProvider>
                <Router>
                    <Pages />
                </Router>
            </GlobalProvider>
        </div>
    )
}

export default Routes
