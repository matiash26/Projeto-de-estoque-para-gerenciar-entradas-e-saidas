import StockWithContext from "../../Contexts/WithContexts/StockWithContext"
import EntriesWithContext from "../../Contexts/WithContexts/EntriesWithContext"
import Statistics from "../../pages/Statistics"
import { Routes, Route } from "react-router-dom"
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
                    <Route path="/estoque" element={<StockWithContext/>} />
                    {/* <Route path="/graficos" element={<Statistics />} /> */}
                </Routes>
            </div>
        </>
    )
}
export default Pages;