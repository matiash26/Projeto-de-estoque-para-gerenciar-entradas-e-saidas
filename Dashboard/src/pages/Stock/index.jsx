import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { StockContext } from "../../Contexts/StockContext"
import { GlobalContext } from "../../Contexts/GlobalContext"
import { BsBoxSeam } from "react-icons/bs"
import {FiCheck, FiX} from "react-icons/fi"
import ModalConfirm from "../../components/ModalConfirm"
import NavbarSearch from "../../components/NavbarSearch"
import Notification from "../../components/Notification"
import StockItem from "../../components/StocktItem"
import Pagination from "../../components/Pagination"
import DataTableProduct from "../../components/DataTableProduct"
import Button from "../../components/Button"
import Input from "../../components/Input"
import InputAutoComplet from "../../components/InputAutoComplet/Index"
import Table from "../../components/Table"
import Modal from "../../components/Modal"
import api from "../../services/Api"
import CheckBox from "../../components/CheckBox"
import "./style.css"

function Stock() {
    const filterRef = useRef(undefined)
    const activeRef = useRef(undefined)
    const [stockModal, setStockModal] = useState([])
    const [productData, setProductData] = useState([])
    const [stockTable, setStockTable] = useState([])
    const [deepCopyTable, setDeepCopyTable] = useState([])
    const [alert, setAlert] = useState("")

    const { modalConfirmIsOpen, modalValue, btnModalIsOpen,
        modalConfirmValue, setModalConfirmValue } = useContext(GlobalContext)
    const { produto, setProduto, estoque, setEstoque,
        index, setIndex, uniqueObject, setUniqueObject, clearFields, statusRef} = useContext(StockContext)

    const handleAddProductCart = () => {
        const status = statusRef.current.checked ? "ativo" : "desativado"
        const addProduct = productData.filter(el => el.produto === produto)[0]
        if (index != null) {
            setStockModal(prev => prev.map((product, x) => x === index ? {...addProduct, status, estoque} : product))
            setIndex(null)
        } else if(addProduct) {
            setStockModal(prev => [...prev, {...addProduct, status, estoque}])
        }
        clearFields("")
    }
    const handleEditProductCart = (index) => {
        setProduto(stockModal[index].produto)
        setEstoque(stockModal[index].estoque)
        setIndex(index)
    }
    const handleRemoveProductCart = (index) => {
        const removed = stockModal.filter((el, x) => x != index)
        setStockModal(removed)
    }
    const handleDeleteProduct = async () => {
        const id = uniqueObject.id
        const active =uniqueObject.active
        const { data } = await api.delete(`/estoque/${id}?active=${active}`)
        setAlert(data)
    }
    const handleUpdateProduct = async () => {
        const status = statusRef.current.checked
        const getProduct = productData.filter(el => el.produto === produto)[0]
        const addProduct = {
            id: uniqueObject.id,
            idProduto: getProduct.id,
            produto,
            status,
            estoque,
        }
        const { data } = await api.put("/estoque/", addProduct, uniqueObject)
        if (data.status === "success") {
            clearFields()
            setUniqueObject(false)
            btnModalIsOpen()
        }
        setAlert(data)
    }
    const handleFilter = async () => {
        const filter = filterRef.current.value
        const active = activeRef.current.value
        if (filter || active) {
            const { data } = await api.get(`/estoque/?search=${filter}&active=${active}`)
            setDeepCopyTable(data)
        } else {
            const { data } = await api.get("/estoque/all")
            setDeepCopyTable(data)
        }
    }
    const handleSubmit = async () => {
        const { data } = await api.post("/estoque/", stockModal)
        if (data.status === "success") {
            setStockModal([])
            clearFields()
            btnModalIsOpen()
        }
        setAlert(data)
    }
    const fechProduct = useCallback(async () => {
        const { data } = await api.get("/produtos/all")
        setProductData(data)
    }, [])
    const FechStock = useCallback(async () => {
        const { data } = await api.get("/estoque/all")
        setStockTable(data)
    }, [])
    useEffect(() => {
        fechProduct()
        FechStock()
        if (alert.success) {
            clearFields()
        }
        if (modalConfirmValue) {
            handleDeleteProduct()
            setModalConfirmValue(false)
            setUniqueObject(false)
        }
    }, [alert, modalConfirmValue])

    return (
        <div className="Container-Main">
            <main className="main-content">
                {alert && <Notification alert={alert} />}
                {modalConfirmIsOpen && <ModalConfirm setObject={setUniqueObject} title="Deletar o produto" desc="Você realmente deseja deletar o produto?" />}
                <NavbarSearch btnFilter={handleFilter} search={filterRef} active={activeRef} />
                {modalValue &&
                    <Modal title="ADICIONAR AO ESTOQUE" icon={<BsBoxSeam />} clearModal={clearFields} setObject={setUniqueObject}>
                        <form className="form-pop">
                            <div className="product-content">
                                <InputAutoComplet title="Nome do Produto" type="text" data={productData} value={produto} setValue={setProduto} />
                                <Input title="Quantidade" type="number" value={estoque} onChange={e => setEstoque(e.target.value)} />
                                <CheckBox title="status" refs={statusRef} icon01={<FiX/>} icon02={<FiCheck/>}/>
                                {!uniqueObject && <Button title="ADICIONAR" type="button" className="poolBlue" onClick={handleAddProductCart} />}
                            </div>
                        </form>
                        <ol className="form-items">
                            {
                                stockModal.map((item, index) => <StockItem key={index}
                                    produto={item}
                                    editCart={() => handleEditProductCart(index)}
                                    removeCart={() => handleRemoveProductCart(index)} />)
                            }
                        </ol>
                        <div className="modal-total">
                            {uniqueObject ? <Button title="ATUALIZAR" className="blue" type="button" onClick={handleUpdateProduct} /> : <Button title="FINALIZAR" type="submit" className="green" onClick={handleSubmit} />}
                        </div>
                    </Modal>
                    
                }
                <section className="table-content">
                    <Pagination dataItem={deepCopyTable} itemTable={setStockTable} />
                    <Table th={["#ID", "produto", "data", "status", "em estoque", "preço"]}>
                        {
                            stockTable.map((product, index) => <DataTableProduct key={index} data={product} />)
                        }
                    </Table>
                </section>
            </main>
        </div>
    )
}
export default Stock