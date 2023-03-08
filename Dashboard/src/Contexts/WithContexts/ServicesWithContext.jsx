import ServiceProvider from "../ServiceContext"
import Service from "../../pages/Services"

function ServiceWithContext() {
    return (
        <ServiceProvider>
            <Service/>
        </ServiceProvider>
    )
}
export default ServiceWithContext;