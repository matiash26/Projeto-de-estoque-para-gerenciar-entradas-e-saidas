import ProductsProvider from "../ProductsContext"
import Products from "../../pages/Products"

function ProductsWithContext() {
    return (
        <ProductsProvider>
            <Products />
        </ProductsProvider>
    )
}
export default ProductsWithContext