import { useState } from "react"
import { Link } from "react-router-dom"
import {
    BiBox, BiChevronLeft, BiChevronRight,
    BiLayout, BiBarChartAlt2
} from "react-icons/bi"
import { FiBox } from "react-icons/fi"
import "./style.css"

function Aside() {
    const [modelOpen, setModelOpen] = useState(true)

    const handleAsideModel = () => {
        setModelOpen(prev => !prev)
    }
    return (
        <aside className={modelOpen && "close"}>
            <div className={`asideContainer ${modelOpen && "close"}`}>
                <div className="asideContent">
                    <h5>MAIN MENU</h5>
                    <ul className="menulist">
                        <li><Link to="/"><BiLayout /><span className={modelOpen && "text-btn"}>Dashboard</span></Link></li>
                        <li><Link to="/estoque"><BiBox /><span className={modelOpen && "text-btn"}>Estoque</span></Link></li>
                        <li><Link to="/produtos"><FiBox /><span className={modelOpen && "text-btn"}>Produtos</span></Link></li>
                        <li><Link to="/graficos"><BiBarChartAlt2 /><span className={modelOpen && "text-btn"}>Gráficos</span></Link></li>
                    </ul>
                    <div className="btnAside ">
                        <button onClick={handleAsideModel}> {modelOpen ? <BiChevronRight /> : <BiChevronLeft />}</button>
                    </div>
                </div>
            </div>
        </aside>
    )
}
export default Aside