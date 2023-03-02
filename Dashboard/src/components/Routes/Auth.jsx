import Login from "../../pages/Login"
import { Routes, Route } from "react-router-dom"
function Auth() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
export default Auth;