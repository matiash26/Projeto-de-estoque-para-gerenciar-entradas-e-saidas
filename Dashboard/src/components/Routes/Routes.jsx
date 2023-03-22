import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
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
            <AuthProvider>
                <GlobalProvider>
                    <Routes>
                        <Route path="/" element={<PrivateRoute />}>
                            <Route index element={<EntriesWithContext />} />
                            <Route path="/produtos" element={<ProductWithContext />} />
                            <Route path="/serviços" element={<ServiceWithContext />} />
                            <Route path="/estoque" element={<StockWithContext />} />
                            <Route path="/graficos" element={<Statistics />} />
                            <Route path="/perfil" element={<Profile />} />
                            <Route path="/usuarios" element={<Users />} />
                        </Route>
                        <Route path="/*" element={<h1>PAGINA NÃO ENCONTRADA</h1>} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </GlobalProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default AppRoutes
