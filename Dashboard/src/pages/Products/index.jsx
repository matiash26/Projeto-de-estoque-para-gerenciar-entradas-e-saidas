import { useCallback, useContext, useEffect, useState } from "react"
import { FiCheck, FiX, FiBox } from "react-icons/fi"
import { productContext } from "../../Contexts/ProductsContext"
import { GlobalContext } from "../../Contexts/GlobalContext"
import DataTableProducts from "../../components/DataTableProducts"
import NavbarSearch from "../../components/NavbarSearch"
import Notification from "../../components/Notification"
import ModalConfirm from "../../components/ModalConfirm"
import ProductItem from "../../components/ProductItem"
import Pagination from "../../components/Pagination"
import CheckBox from "../../components/CheckBox"
import Button from "../../components/Button"
import Modal from "../../components/Modal"
import Table from "../../components/Table"
import Input from "../../components/Input"
import api from "../../services/Api"
import "./style.css"

function Products() {
    const [copyTable, setCopyTable] = useState([])
    const [productTable, setProductTable] = useState([])
    const [productModal, setProductModal] = useState([])
    const [alert, setAlert] = useState('')

    const { modalConfirmIsOpen, modalValue, btnModalIsOpen,
        modalConfirmValue, setModalConfirmValue } = useContext(GlobalContext)
    const { setUpdateOrDelete, updateOrDelete, index, setIndex, produto, setProduto, valor, setValor, statusRef, setCheckbox, checkbox, filterRef, clearFields } = useContext(productContext)

    const handleAddProductModal = () => {
        const productObj = {
            produto,
            valor,
            status: checkbox
        }
        const checkIfProductExist = productTable.some(el => el.produto.toLowerCase() === produto.toLowerCase())
        if (checkIfProductExist) {
            const alertObject = {
                status: "error",
                message: "O produto já existe!"
            }
            setAlert(alertObject)
        } else {
            if (produto && valor) {
                if (index != undefined) {
                    productObj.produto = produto
                    productObj.valor = valor
                    productObj.status = checkbox
                    setProductModal(prev => prev.map((product, x) => x === index ? { ...productObj } : product))
                    setIndex(undefined)
                } else {
                    setProductModal(prev => [...prev, productObj])
                }
                clearFields()
            }
        }
    }
    const handleEditProductModal = async (index) => {
        setProduto(productModal[index].produto)
        setValor(productModal[index].valor)
        setCheckbox(productModal[index].status)
        setIndex(index)
    }
    const handleRemoveProductModal = async (index) => {
        setProductModal(product => product.filter((el, x) => x != index))
    }
    const handleUpdateProduct = async () => {
        const status = checkbox ? "1" : "0"
        const updateProduct = {
            id: updateOrDelete.id,
            produto: produto,
            status: status,
            valor: valor
        }
        const { data } = await api.put("/product/", updateProduct)
        if (data.status === "success") {
            clearFields()
            btnModalIsOpen()
        }
        setAlert(data)
    }
    const handleDeleteProduct = async () => {
        const id = updateOrDelete.id
        const active = updateOrDelete.status
        const { data } = await api.delete(`/product/${id}?status=${active}`)
        setAlert(data)
        setUpdateOrDelete(undefined)
    }
    const handleFilter = async () => {
        const filter = filterRef.current.value
        const status = statusRef.current.value
        if (filter || status) {
            const { data } = await api.get(`/product/?search=${filter}&status=${status}`)
            setCopyTable(data)
        } else {
            const { data } = await api.get("/product")
            setCopyTable(data)
        }
    }
    const handleSubmit = async () => {
        const { data } = await api.post("/product/", productModal)
        if (data.status === "success") {
            setProductModal([])
            clearFields()
            btnModalIsOpen()
        }
        setAlert(data)
    }
    const fetchAllData = useCallback(async () => {
        const { data } = await api.get("/product/all")
        if(data.status !="error"){
            setCopyTable(data)
        }
    }, [])

    useEffect(() => {
        fetchAllData()
        if (modalConfirmValue) {
            handleDeleteProduct()
            setModalConfirmValue(false)
        }
    }, [modalConfirmValue, alert])
    return (
        <div className="Container-Main">
            {console.log("render")}
            <main className="main-content">
                {alert && <Notification alert={alert} setAlert={setAlert} />}
                {modalConfirmIsOpen && <ModalConfirm title="Ocultar" desc="Você realmente deseja ocultar o produto?" setObject={setUpdateOrDelete} />}
                <NavbarSearch btnFilter={handleFilter} search={filterRef} status={statusRef} />
                {modalValue &&
                    <Modal title="ADICIONAR PRODUTO" icon={<FiBox />} clearModal={setProductModal} clearFields={clearFields} updateExist={setUpdateOrDelete}>
                        <form className="form-pop">
                            <div className="form-content">
                                <Input title="Produto" type="text" value={produto} onChange={e => setProduto(e.target.value)} />
                                <Input title="valor" type="number" value={valor} onChange={e => setValor(e.target.value)} />
                                <CheckBox title="status" checked={checkbox} onChange={e => setCheckbox(e.target.checked)} icon01={<FiX />} icon02={<FiCheck />} />
                                {!updateOrDelete && <Button title="ADICIONAR" type="button" className="poolBlue" onClick={handleAddProductModal} />}
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
                            {updateOrDelete ? <Button title="ATUALIZAR" className="blue" type="button" onClick={handleUpdateProduct} /> : <Button title="FINALIZAR" type="submit" className="green" onClick={handleSubmit} />}
                        </div>
                    </Modal>
                }
                <section className="table-content">
                    <Pagination dataItem={copyTable} itemTable={setProductTable} />
                    <Table th={["#id", "produtos", "status", "valor"]}>
                        {productTable.map(product => <DataTableProducts key={product.id} data={product} />)}
                    </Table>
                </section>
            </main>
        </div>
    )
}
export default Products