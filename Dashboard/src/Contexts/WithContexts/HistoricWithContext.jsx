import HistoricProvider from "../HistoricContext"
import Historic from "../../pages/historic"

function HistoricWithContext() {
    return (
        <HistoricProvider>
            <Historic />
        </HistoricProvider>
    )
}
export default HistoricWithContext