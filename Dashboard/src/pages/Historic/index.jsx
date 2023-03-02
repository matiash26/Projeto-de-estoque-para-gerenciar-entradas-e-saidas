import { useContext, useCallback, useRef, useState, useEffect } from "react"
import { HistoricContext } from "../../Contexts/HistoricContext"
import { GlobalContext } from "../../Contexts/GlobalContext"
import { BsCart4 } from "react-icons/bs"
import DataTableHistoric from "../../components/DataTableHistoric"
import Notification from "../../components/Notification"
import ModalConfirm from "../../components/ModalConfirm"
import NavbarSearch from "../../components/NavbarSearch"
import Pagination from "../../components/Pagination"
import CartItem from "../../components/CartItem"
import Select from "../../components/Select"
import Button from "../../components/Button"
import Table from "../../components/Table"
import Modal from "../../components/Modal"
import api from "../../services/Api"
import "./style.css"

function Historic() {
    const [notificationValue, setNotificationValue] = useState("")
    const [itemsToPagination, setItemsToPagination] = useState([])
    const [product, setProduct] = useState([])
    const [historic, setHistoric] = useState([])
    const { cart, setCart, update, setUpdate, oldCart, orderID } = useContext(HistoricContext)
    const { modalConfirmIsOpen, modalValue, btnModalIsOpen, setModalConfirmValue, modalConfirmValue, } = useContext(GlobalContext)
    const startDateRef = useRef("")
    const offsetDateRef = useRef("")

    const handleAddToCart = (getID) => {
        const id = +getID.target.value
        const AddAndTotal = product.find(product => {
            if (product.id === id) {
                product.total = product.quantidade * product.saida
                return product
            }
        })
        const IfExistInCart = cart.some(item => item.id == id)
        if (!IfExistInCart) {
            setCart(prev => [...prev, AddAndTotal])
        }
    }
    const handleRemoveFromCart = (getID) => {
        const itemCartRemoved = cart.filter(product => product.id != getID)
        setCart(itemCartRemoved)
    }
    const handleQuantity = (number, id) => {
        let quantity = +number.currentTarget.value
        if (quantity === 0) {
            quantity = 1
        } else {
            let index = cart.findIndex(el => el.id === id)
            setCart(prev => {
                prev[index].quantidade = quantity
                prev[index].total = quantity * +prev[index].saida
                return [...prev]
            })
        }
    }
    const calculateTotal = (cart) => {
        return cart.reduce((acc, { total }) => acc += +total, 0).toFixed(2)
    }
    const handleUpdateHistoric = async () => {
        const { data } = await api.put("/historico/", { cart, oldCart })
        if (data.status === "success") {
            setCart([])
            btnModalIsOpen()
            setUpdate(false)
        }
        setNotificationValue(data)
    }
    const handleSubmit = async () => {
        const { data } = await api.post("/historico/", cart)
        if (data.status === "success") {
            setCart([])
            btnModalIsOpen()
        }
        setNotificationValue(data)
    }
    const handleFilter = async () => {
        const startDate = startDateRef.current.value
        const offsetDate = offsetDateRef.current.value
        if (startDate && offsetDate) {
            const { data } = await api.get(`/historico/filter/${startDate}/${offsetDate}`)
            setItemsToPagination(data)
        } else {
            const { data } = await api.get("/historico/all")
            setItemsToPagination(data)
        }
    }
    const handleDelete = async () => {
        const { data } = await api.delete("/historico/" + orderID)
        setNotificationValue(data)
    }
    const fetchData = useCallback(async () => {
        const { data } = await api.get("/produtos/all")
        const historic = await api.get("/historico/all")
        setProduct(data.map(product => ({ ...product, quantidade: 1 })))
        setItemsToPagination(historic.data)
    }, [])

    useEffect(() => {
        fetchData()
        if (modalConfirmValue) {
            handleDelete()
            setModalConfirmValue(false)
        }
    }, [notificationValue, modalConfirmValue])

    return (
        <div className="Container-Main">
            {notificationValue && <Notification alert={notificationValue} />}
            {modalConfirmIsOpen && <ModalConfirm title="Deletar o pedido" desc="Você realmente deseja deletar o pedido?" />}
            <main className="main-content">
                {modalValue && <Modal title="ADICIONAR PEDIDO" updateExist={setUpdate} clearModal={setCart} icon={<BsCart4 />}>
                    <div className="modal-search">
                        <h4>Produtos</h4>
                        <Select onChange={e => handleAddToCart(e)} disabled={update} label="Selecione um Produto">
                            {
                                product.map((produto, x) => <option key={x}
                                    value={produto.id}>{`${produto.produto} - R$: ${produto.saida}`}</option>)
                            }
                        </Select>
                    </div>
                    <form onSubmit={e => e.preventDefault(e)} className="form-pop">
                        <ul className="listProducts">
                            {
                                cart.map((item, index) => <CartItem
                                    key={index}
                                    item={item}
                                    quantity={item.quantidade}
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    onChange={e => handleQuantity(e, item.id)}
                                    updateExist={update} />)
                            }
                        </ul>
                        <div className="modal-total">
                            {update ? <Button title="ATUALIZAR" className="blue" type="button" onClick={handleUpdateHistoric} /> : <Button title="FINALIZAR" onClick={handleSubmit} className="green" />}
                            <p>Total R$: {calculateTotal(cart)}</p>
                        </div>
                    </form>
                </Modal>
                }
                <NavbarSearch entrada={startDateRef} saida={offsetDateRef} withDate={true} btnFilter={handleFilter} value="Filtro" />
                <section className="table-content">
                    <Pagination dataItem={itemsToPagination} itemTable={setHistoric} />
                    <Table th={['#id', "pedido", "status", "data do pedido", "produtos", "total"]}>
                        {
                            historic.map((item, x) => <DataTableHistoric key={x} item={item} btnRemoveDesative={update} />)
                        }
                    </Table>
                </section>
            </main>
        </div>
    )
}
export default Historic