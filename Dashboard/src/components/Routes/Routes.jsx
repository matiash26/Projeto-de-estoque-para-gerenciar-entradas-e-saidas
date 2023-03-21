import { BrowserRouter, Routes, Route } from "react-router-dom"
import EntriesWithContext from "../../Contexts/WithContexts/EntriesWithContext"
import ProductWithContext from "../../Contexts/WithContexts/ProductsWithContext"
import ServiceWithContext from "../../Contexts/WithContexts/ServicesWithContext"
import StockWithContext from "../../Contexts/WithContexts/StockWithContext"
import GlobalProvider from "../../Contexts/GlobalContext"
import AuthProvider from "../../Contexts/AuthContext"
import Statistics from "../../pages/Statistics"
import PrivateRoute from "./PrivateRoute"
import Profile from "../../pages/Profile"
import Users from "../../pages/Users"
import Login from "../../pages/Login"

function AppRoutes() {
    return (
        <BrowserRouter>
            <GlobalProvider>
                <AuthProvider>
                    <Routes>
                        <Route element={<PrivateRoute />}>
                            <Route path="/*" element={<EntriesWithContext />} />
                            <Route path="/produtos" element={<ProductWithContext />} />
                            <Route path="/servicos" element={<ServiceWithContext />} />
                            <Route path="/estoque" element={<StockWithContext />} />
                            <Route path="/graficos" element={<Statistics />} />
                            <Route path="/perfil" element={<Profile />} />
                            <Route path="/usuarios" element={<Users />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </AuthProvider>
            </GlobalProvider>
        </BrowserRouter>
    )
}

export default AppRoutes
