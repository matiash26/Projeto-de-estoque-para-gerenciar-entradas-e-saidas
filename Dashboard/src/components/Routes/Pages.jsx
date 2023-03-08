import { Routes, Route } from "react-router-dom"
import EntriesWithContext from "../../Contexts/WithContexts/EntriesWithContext"
import ProductWithContext from "../../Contexts/WithContexts/ProductsWithContext"
import ServiceWithContext from "../../Contexts/WithContexts/ServicesWithContext"
import StockWithContext from "../../Contexts/WithContexts/StockWithContext"
import Statistics from "../../pages/Statistics"
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
                    <Route path="/estoque"  element={<StockWithContext />} />
                    <Route path="/produtos" element={<ProductWithContext />} />
                    <Route path="/serviço"  element={<ServiceWithContext />} />
                    <Route path="/graficos" element={<Statistics />} />
                </Routes>
            </div>
        </>
    )
}
export default Pages;