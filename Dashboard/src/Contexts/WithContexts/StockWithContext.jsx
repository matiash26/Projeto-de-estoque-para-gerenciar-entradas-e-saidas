import StockProvider from "../StockContext"
import Stock from "../../pages/Stock"

function StockWithContext() {
    return (
        <StockProvider>
            <Stock />
        </StockProvider>
    )
}
export default StockWithContext;