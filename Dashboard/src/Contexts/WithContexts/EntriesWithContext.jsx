import EntriesProvider from "../EntriesContext"
import Entries from "../../pages/Entries"

function EntriesWithContext() {
    return (
        <EntriesProvider>
            <Entries />
        </EntriesProvider>
    )
}
export default EntriesWithContext