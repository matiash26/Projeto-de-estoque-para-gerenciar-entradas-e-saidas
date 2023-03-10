import { Routes, Route } from "react-router-dom"
import EntriesWithContext from "../../Contexts/WithContexts/EntriesWithContext"
import ProductWithContext from "../../Contexts/WithContexts/ProductsWithContext"
import ServiceWithContext from "../../Contexts/WithContexts/ServicesWithContext"
import StockWithContext from "../../Contexts/WithContexts/StockWithContext"
import Statistics from "../../pages/Statistics"
import Profile from "../../pages/Profile"
import Users from "../../pages/Users"
import Header from "../Header"
import Aside from "../Aside"
function Pages() {
    return (
        <>
            <Aside />
            <div className="Container">
                <Header />
                <Routes>
                    <Route path="/" element={<EntriesWithContext />} />
                    <Route path="/estoque" element={<StockWithContext />} />
                    <Route path="/produtos" element={<ProductWithContext />} />
                    <Route path="/serviço" element={<ServiceWithContext />} />
                    <Route path="/graficos" element={<Statistics />} />
                    <Route path="/perfil" element={<Profile />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </div>
        </>
    )
}
export default Pages;