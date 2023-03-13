import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { GlobalContext } from "../../Contexts/GlobalContext"
import { StockContext } from "../../Contexts/StockContext"
import { FiCheck, FiX } from "react-icons/fi"
import { BiBox } from "react-icons/bi"
import InputAutoComplet from "../../components/InputAutoComplet/Index"
import DataTableStock from "../../components/DataTableStock"
import ModalConfirm from "../../components/ModalConfirm"
import NavbarSearch from "../../components/NavbarSearch"
import Notification from "../../components/Notification"
import Pagination from "../../components/Pagination"
import StockItem from "../../components/StocktItem"
import CheckBox from "../../components/CheckBox"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Table from "../../components/Table"
import Modal from "../../components/Modal"
import api from "../../services/Api"
import "./style.css"

function Stock() {
    const [copyTable, setCopyTable] = useState([])
    const [productData, setProductData] = useState([])
    const [stockModal, setStockModal] = useState([])
    const [stockTable, setStockTable] = useState([])
    const [alert, setAlert] = useState("")
    const filterRef = useRef(undefined)
    const statusRef = useRef(undefined)

    const { modalConfirmIsOpen, modalValue, btnModalIsOpen,
        modalConfirmValue, setModalConfirmValue } = useContext(GlobalContext)
    const { produto, setProduto, estoque, setEstoque,
        index, setIndex, updateOrDelete, setUpdateOrDelete, clearFields, checkbox, setCheckbox } = useContext(StockContext)

    const handleAddProductCart = () => {
        const addProduct = productData.filter(el => el.produto === produto)[0]
        const status = checkbox ? "ativo" : "desativado"
        if (addProduct && estoque) {
            if (index != null) {
                setStockModal(prev => prev.map((product, x) => x === index ? { ...addProduct, status, estoque } : product))
                setIndex(null)
            } else if (addProduct) {
                setStockModal(prev => [...prev, { ...addProduct, status, estoque }])
            }
            clearFields()
        }
    }
    const handleEditProductCart = (index) => {
        setProduto(stockModal[index].produto)
        setEstoque(stockModal[index].estoque)
        setIndex(index)
    }
    const handleRemoveProductCart = (index) => {
        setStockModal(prev => prev.splice(index, 1))
    }
    const handleDeleteProduct = async () => {
        const id = updateOrDelete.id
        const active = updateOrDelete.active
        const { data } = await api.delete(`/stock/${id}?active=${active}`)
        setAlert(data)
    }
    const handleUpdateProduct = async () => {
        const checkProductIsValid = productData.filter(el => el.produto === produto)[0]
        if (checkProductIsValid) {
            const getProduct = productData.filter(el => el.produto === produto)[0]
            const updateProduct = {
                id: updateOrDelete.id,
                idProduto: getProduct.id,
                produto,
                status: checkbox,
                estoque,
            }
            const { data } = await api.put("/stock/", updateProduct, updateOrDelete)
            if (data.status === "success") {
                clearFields()
                setUpdateOrDelete(false)
                btnModalIsOpen()
            }
            setAlert(data)
        }
    }
    const handleFilter = async () => {
        const filter = filterRef.current.value
        const active = statusRef.current.value
        if (filter || active) {
            const { data } = await api.get(`/stock/?search=${filter}&active=${active}`)
            setCopyTable(data)
        } else {
            const { data } = await api.get("/stock/all")
            setCopyTable(data)
        }
    }
    const handleSubmit = async () => {
        const { data } = await api.post("/stock/", stockModal)
        if (data.status === "success") {
            setStockModal([])
            clearFields()
            btnModalIsOpen()
        }
        setAlert(data)
    }
    const fetchData = useCallback(async () => {
        const products = await api.get("/product/all")
        const stock = await api.get("/stock/all")
        const producItem = await products.data
        const stockItem = await stock.data
        const PromiseResolve = await Promise.all(
            producItem.map(async el => {
              const productExistInStock = await stockItem.find(stock => stock.produto === el.produto);
              return productExistInStock ? null : el;
            })
          );
        const ifProductNotExistInStock = PromiseResolve.filter(el => el !== null);
        setProductData(ifProductNotExistInStock)
        setCopyTable(stockItem)
    }, [])

    useEffect(() => {
        fetchData()
          
        if (alert.success) {
            clearFields()
        }
        if (modalConfirmValue) {
            handleDeleteProduct()
            setModalConfirmValue(false)
        }
    }, [alert, modalConfirmValue])

    return (
        <div className="Container-Main">
            <main className="main-content">
                {alert && <Notification alert={alert} setAlert={setAlert}/>}
                {modalConfirmIsOpen && <ModalConfirm setObject={setUpdateOrDelete} title="Deletar o produto" desc="Você realmente deseja deletar o produto?" />}
                <NavbarSearch btnFilter={handleFilter} search={filterRef} status={statusRef} />
                {modalValue &&
                    <Modal title="ADICIONAR AO ESTOQUE" icon={<BiBox />} clearModal={setStockModal} clearFields={clearFields} updateExist={setUpdateOrDelete}>
                        <form className="form-pop">
                            <div className="form-content">
                                <InputAutoComplet title="Nome do Produto" type="text" data={productData} value={produto} setValue={setProduto} />
                                <Input title="Quantidade" type="number" value={estoque} onChange={e => setEstoque(e.target.value)} />
                                <CheckBox title="status" checked={checkbox} onChange={e => setCheckbox(e.target.checked)} icon01={<FiX />} icon02={<FiCheck />} />
                                {!updateOrDelete && <Button title="ADICIONAR" type="button" className="poolBlue" onClick={handleAddProductCart} />}
                            </div>
                        </form>
                        <ol className="form-items">
                            {
                                stockModal.map((item, index) => <StockItem key={index}
                                    produto={item}
                                    editModal={() => handleEditProductCart(index)}
                                    removeModal={() => handleRemoveProductCart(index)} />)
                            }
                        </ol>
                        <div className="modal-total">
                            {updateOrDelete ? <Button title="ATUALIZAR" className="blue" type="button" onClick={handleUpdateProduct} /> : <Button title="FINALIZAR" type="submit" className="green" onClick={handleSubmit} />}
                        </div>
                    </Modal>

                }
                <section className="table-content">
                    <Pagination dataItem={copyTable} itemTable={setStockTable} />
                    <Table th={["#ID", "produto", "data", "status", "em estoque"]}>
                        {
                            stockTable.map((product, index) => <DataTableStock key={index} data={product} />)
                        }
                    </Table>
                </section>
            </main>
        </div>
    )
}
export default Stock