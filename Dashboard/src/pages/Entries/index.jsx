import { useContext, useRef, useState, useEffect, useCallback } from "react"
import { EntriesContext } from "../../Contexts/EntriesContext"
import { GlobalContext } from "../../Contexts/GlobalContext"
import { BsCart4 } from "react-icons/bs"
import DataTableEntries from "../../components/DataTableEntries"
import InputAutoComplet from "../../components/InputAutoComplet/Index"
import Notification from "../../components/Notification"
import ModalConfirm from "../../components/ModalConfirm"
import NavbarSearch from "../../components/NavbarSearch"
import Pagination from "../../components/Pagination"
import CartItem from "../../components/CartItem"
import Button from "../../components/Button"
import Table from "../../components/Table"
import Modal from "../../components/Modal"
import api from "../../services/Api"
import "./style.css"

function Entries() {
    const [copyTable, setCopyTable] = useState([])
    const [stockData, setStockData] = useState([])
    const [entries, setEntries] = useState([])
    const [alert, setAlert] = useState("")
    const { cart, setCart, update, setUpdate, oldCart, orderID, produto, setProduto, clearFields } = useContext(EntriesContext)
    const { modalConfirmIsOpen, modalValue, btnModalIsOpen, setModalConfirmValue, modalConfirmValue } = useContext(GlobalContext)
    const startDateRef = useRef("")
    const offsetDateRef = useRef("")

    const handleAddToCart = () => {
        const foundProduct = stockData.find(product => product.produto === produto)
        if (foundProduct && foundProduct.estoque > 0) {
            const AddAndTotal = {
                id: foundProduct.id,
                produto: foundProduct.produto,
                quantidade: foundProduct.quantidade = 1,
                estoque: foundProduct.estoque,
                valor: foundProduct.valor,
                total: foundProduct.quantidade * +foundProduct.valor
            }
            const IfExistInCart = cart.some(item => item.produto === produto)
            if (!IfExistInCart) {
                setCart(prev => [...prev, AddAndTotal])
                setProduto('')
            }
            return;
        }
        //se o produto que for adicionado não tiver estoque mostre o erro
        const alertObject = {
            status: "error",
            message: `O produto ${foundProduct.produto} tem ${foundProduct.estoque} no estoque`
        }
        setAlert(alertObject)
    }
    const handleRemoveFromCart = (index) => {
        setCart(entrie => entrie.filter((el, x) => x != index))
    }
    const handleQuantity = (number, id) => {
        let quantity = +number.value
        if (quantity === 0) {
            quantity = 1
        } else {
            let index = cart.findIndex(el => el.id === id)
            const ifExistQuantityInStock = (cart[index].estoque - quantity)
            if (ifExistQuantityInStock >= 0) {
                setCart(prev => {
                    prev[index].quantidade = quantity
                    prev[index].total = (quantity * +prev[index].valor).toFixed(2)
                    return [...prev]
                })
                return
            }
            //se a quantidade for maior que o estoque mostre o erro
            const alertObject = {
                status: "error",
                message: `O produto ${cart[index].produto} tem ${cart[index].estoque} no estoque`
            }
            setAlert(alertObject)
        }
    }
    const calculateTotal = (cart) => {
        return cart.reduce((acc, { total }) => acc += +total, 0).toFixed(2)
    }
    const handleUpdateEntries = async () => {
        const { data } = await api.put("/entries/", { cart, oldCart })
        if (data.status === "success") {
            setCart([])
            btnModalIsOpen()
            setUpdate(false)
        }
        setAlert(data)
    }
    const handleSubmit = async () => {
        const { data } = await api.post("/entries/", cart)
        if (data.status === "success") {
            setCart([])
            btnModalIsOpen()
        }
        setAlert(data)
    }
    const handleFilter = async () => {
        const startDate = startDateRef.current.value
        const offsetDate = offsetDateRef.current.value
        if (startDate && offsetDate) {
            const { data } = await api.get(`/entries/filter/${startDate}/${offsetDate}`)
            setCopyTable(data)
        } else {
            const { data } = await api.get("/entries/all")
            setCopyTable(data)
        }
    }
    const handleDelete = async () => {
        const { data } = await api.delete("/entries/" + orderID)
        setAlert(data)
    }
    const fetchAllData = useCallback(async () => {
        const entries = await api.get("/entries/all")
        const stock = await api.get("/stock/all")
        setCopyTable(entries.data)
        setStockData(stock.data)
    }, [])

    useEffect(() => {
        fetchAllData()
        if (modalConfirmValue) {
            handleDelete()
            setModalConfirmValue(false)
        }
    }, [alert, modalConfirmValue])

    return (
        <div className="Container-Main">
            {alert && <Notification alert={alert} setAlert={setAlert} />}
            {modalConfirmIsOpen && <ModalConfirm title="Deletar o pedido" desc="Você realmente deseja deletar o pedido?" />}
            <main className="main-content">
                {modalValue &&
                    <Modal title="ADICIONAR PEDIDO" icon={<BsCart4 />} updateExist={setUpdate} clearModal={setCart} clearFields={clearFields}>
                        <div className="modal-search">
                            <div>
                                <h4>Produtos</h4>
                                <InputAutoComplet data={stockData} value={produto} setValue={setProduto} disabled={update} />
                            </div>
                            <Button onClick={handleAddToCart} title="Adicionar" className="poolBlue" />
                        </div>
                        <form onSubmit={e => e.preventDefault(e)} className="form-historic">
                            <ul className="liststockDatas">
                                {
                                    cart.map((item, index) => <CartItem
                                        key={item.id}
                                        item={item}
                                        quantity={item.quantidade}
                                        removeModal={() => handleRemoveFromCart(index)}
                                        onChange={({currentTarget}) => handleQuantity(currentTarget, item.id)}
                                        updateExist={update} />)
                                }
                            </ul>
                            <div className="modal-total">
                                {update ? <Button title="ATUALIZAR" className="blue" type="button" onClick={handleUpdateEntries} /> : <Button title="FINALIZAR" onClick={handleSubmit} className="green" />}
                                <p>Total R$: {calculateTotal(cart)}</p>
                            </div>
                        </form>
                    </Modal>

                }
                <NavbarSearch entrada={startDateRef} saida={offsetDateRef} withDate={true} btnFilter={handleFilter} value="Filtro" />
                <section className="table-content">
                    <Pagination dataItem={copyTable} itemTable={setEntries} />
                    <Table th={['#id', "pedido", "data do pedido", "produtos", "total"]}>
                        {
                            entries.map((item, x) => <DataTableEntries key={x} item={item} btnRemoveDesative={update} />)
                        }
                    </Table>
                </section>
            </main>
        </div>
    )
}
export default Entries