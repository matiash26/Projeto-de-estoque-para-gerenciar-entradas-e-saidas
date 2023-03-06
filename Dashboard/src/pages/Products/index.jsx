import { useCallback, useContext, useEffect, useState } from "react"
import { productContext } from "../../Contexts/ProductsContext"
import { GlobalContext } from "../../Contexts/GlobalContext"
import { FiCheck, FiX } from "react-icons/fi"
import { FiBox } from "react-icons/fi"
import DataTableProducts from "../../components/DataTableProducts"
import NavbarSearch from "../../components/NavbarSearch"
import Notification from "../../components/Notification"
import ProductItem from "../../components/ProductItem"
import Pagination from "../../components/Pagination"
import CheckBox from "../../components/CheckBox"
import Button from "../../components/Button"
import Modal from "../../components/Modal"
import Table from "../../components/Table"
import Input from "../../components/Input"
import Api from "../../services/Api"

function Products() {
    const [productTable, setProductTable] = useState([])
    const [productModal, setProductModal] = useState([])
    const [itemsToPagination, setItemsToPagination] = useState([])
    const [alert, setAlert] = useState('')

    const { modalConfirmIsOpen, modalValue, btnModalIsOpen,
        modalConfirmValue, setModalConfirmValue } = useContext(GlobalContext)
    const { index, setIndex, setUpdate, update, produto, setProduto, valor, setValor, statusRef, filterRef, clearFields } = useContext(productContext)

    const handleAddProductModal = () => {
        const status = statusRef.current.checked
        const productObj = {
            produto,
            valor,
            status
        }
        if (produto && valor) {
            if (index != undefined) {
                productObj.produto = produto
                productObj.valor = valor
                productObj.status = status
                setProductModal(prev => prev.map((product, x) => x === index ? { ...productObj } : product))
                setIndex(undefined)
            } else {
                setProductModal(prev => [...prev, productObj])
            }
            clearFields()
        }
    }
    const handleFilter = async () => {
        const filter = filterRef.current.value
        const status = statusRef.current.value
        if (filter || status) {
            const { data } = await Api.get(`/produtos/?search=${filter}&status=${status}`)
            setItemsToPagination(data)
        } else {
            const { data } = await Api.get("/produtos")
            setItemsToPagination(data)
        }
    }
    const handleUpdateProduct = async () => {

    }
    const handleEditProductModal = async (index) => {
        setProduto(productModal[index].produto)
        setValor(productModal[index].valor)
        statusRef.current.checked = productModal[index].status
        setIndex(index)
    }
    const handleRemoveProductModal = async (index) => {
        setProductModal(prev => prev.splice(index, 1))
    }
    const handleSubmit = async () => {

    }
    const fetchData = useCallback(async () => {
        const { data } = await Api.get("/produtos/all")
        setItemsToPagination(data)
    }, [])
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="Container-Main">
            <main className="main-content">
                {alert && <Notification alert={alert} />}
                <NavbarSearch btnFilter={handleFilter} search={filterRef} status={statusRef} />
                {modalValue && 
                <Modal title="ADICIONAR PRODUTO" icon={<FiBox />} clearModal={setProductModal} clearFields={clearFields} updateExist={setUpdate}>
                    <form className="form-pop">
                        <div className="product-content">
                            <Input title="Produto" type="text" value={produto} onChange={e => setProduto(e.target.value)} />
                            <Input title="valor" type="number" value={valor} onChange={e => setValor(e.target.value)} />
                            <CheckBox title="status" refs={statusRef} icon01={<FiX />} icon02={<FiCheck />} />
                            {!update && <Button title="ADICIONAR" type="button" className="poolBlue" onClick={handleAddProductModal} />}
                        </div>
                    </form>
                    <ol className="form-items">
                        {
                            productModal.map((item, index) => <ProductItem key={index}
                                produto={item}
                                editModal={() => handleEditProductModal(index)}
                                removeModal={() => handleRemoveProductModal(index)} />)
                        }
                    </ol>
                    <div className="modal-total">
                        {update ? <Button title="ATUALIZAR" className="blue" type="button" onClick={handleUpdateProduct} /> : <Button title="FINALIZAR" type="submit" className="green" onClick={handleSubmit} />}
                    </div>
                </Modal>
                }
                <section className="table-content">
                    <Pagination dataItem={itemsToPagination} itemTable={setProductTable} />
                    <Table th={["id", "produtos", "status", "valor"]}>
                        {productTable.map(product => <DataTableProducts key={product.id} data={product} />)}
                    </Table>
                </section>
            </main>
        </div>
    )
}
export default Products