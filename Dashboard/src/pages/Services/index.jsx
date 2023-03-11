import { useMemo, useContext, useEffect, useRef, useState, useCallback } from "react"
import { GlobalContext } from "../../Contexts/GlobalContext"
import { ServiceContext } from "../../Contexts/ServiceContext"
import { BiBox } from "react-icons/bi"
import DataTableService from "../../components/DataTableService"
import ModalConfirm from "../../components/ModalConfirm"
import NavbarSearch from "../../components/NavbarSearch"
import Notification from "../../components/Notification"
import ServiceItem from "../../components/ServiceItem"
import Pagination from "../../components/Pagination"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Table from "../../components/Table"
import Modal from "../../components/Modal"
import api from "../../services/Api"
import "./style.css"

function Service() {
    const [deepCopyTable, setDeepCopyTable] = useState([])
    const [serviceModal, setServiceModal] = useState([])
    const [serviceTable, setServiceTable] = useState([])
    const [alert, setAlert] = useState("")
    const startDateRef = useRef("")
    const offsetDateRef = useRef("")

    const { modalConfirmIsOpen, modalValue, btnModalIsOpen,
        modalConfirmValue, setModalConfirmValue } = useContext(GlobalContext)
    const { servico, setServico, gasto, setGasto, clearFields, updateOrDelete, setUpdateOrDelete, setIndex, index } = useContext(ServiceContext)

    const handleAddServiceModal = () => {
        const addService = {
            service: servico,
            gasto: gasto
        }
        if (servico && gasto) {
            if (index != undefined) {
                setServiceModal(prev => {
                    prev[index].service = servico
                    prev[index].gasto = gasto
                    return prev
                })
                setIndex(undefined)
            } else {
                setServiceModal(prev => [...prev, addService])
            }
            clearFields()
        }
    }
    const handleEditServiceModal = (index) => {
        setServico(serviceModal[index].service)
        setGasto(serviceModal[index].gasto)
        setIndex(index)
    }
    const handleRemoveServiceModal = (index) => {
        setServiceModal(service => service.filter((el, x) => x != index))
    }
    const handleDeleteService = async () => {
        const id = updateOrDelete.id
        const { data } = await api.delete(`/services/${id}`)
        setAlert(data)
    }
    const handleUpdateService = async () => {
        const update = {
            id: updateOrDelete.id,
            service: servico,
            gasto: gasto
        }
        const { data } = await api.put("/services/", update)
        if (data.status === "success") {
            clearFields()
            setUpdateOrDelete(false)
            btnModalIsOpen()
            setAlert(data)
        }
    }
    const handleFilter = async () => {
        const startDate = startDateRef.current.value
        const offsetDate = offsetDateRef.current.value
        if (startDate && offsetDate) {
            const { data } = await api.get(`/services/filter/${startDate}/${offsetDate}`)
            setDeepCopyTable(data)
        } else {
            const { data } = await api.get("/services/all")
            setDeepCopyTable(data)
        }
    }
    const handleSubmit = async () => {
        const { data } = await api.post("/services/", serviceModal)
        if (data.status === "success") {
            setServiceModal([])
            clearFields()
            btnModalIsOpen()
        }
        setAlert(data)
    }
    const fetchData = useCallback(async () => {
        const { data } = await api.get("/services/all")
        setDeepCopyTable(data)
    }, [])

    useEffect(() => {
        fetchData()
        if (alert.success) {
            clearFields()
        }
        if (modalConfirmValue) {
            handleDeleteService()
            setModalConfirmValue(false)
        }
    }, [alert, modalConfirmValue])
    return (
        <div className="Container-Main">
            <main className="main-content">
                {alert && <Notification alert={alert} setAlert={setAlert} />}
                {modalConfirmIsOpen && <ModalConfirm setObject={setUpdateOrDelete} title="Deletar o produto" desc="Você realmente deseja deletar o produto?" />}
                {modalValue &&
                    <Modal title="ADICIONAR AO ESTOQUE" icon={<BiBox />} clearModal={setServiceModal} clearFields={clearFields} updateExist={setUpdateOrDelete}>
                        <form className="form-pop">
                            <div className="form-content">
                                <Input title="Serviço" type="text" value={servico} onChange={e => setServico(e.target.value)} />
                                <Input title="Gasto" type="number" value={gasto} onChange={e => setGasto(e.target.value)} />
                                {!updateOrDelete && <Button title="ADICIONAR" type="button" className="poolBlue" onClick={handleAddServiceModal} />}
                            </div>
                        </form>
                        <ol className="form-items">
                            {
                                serviceModal.map((item, index) => <ServiceItem key={index}
                                    service={item}
                                    editModal={() => handleEditServiceModal(index)}
                                    removeModal={() => handleRemoveServiceModal(index)} />)
                            }
                        </ol>
                        <div className="modal-total">
                            {updateOrDelete ? <Button title="ATUALIZAR" className="blue" type="button" onClick={handleUpdateService} /> : <Button title="FINALIZAR" type="submit" className="green" onClick={handleSubmit} />}
                        </div>
                    </Modal>

                }
                <NavbarSearch entrada={startDateRef} saida={offsetDateRef} withDate={true} btnFilter={handleFilter} value="Filtro" />
                <section className="table-content">
                    <Pagination dataItem={deepCopyTable} itemTable={setServiceTable} />
                    <Table th={["#ID", "serviço", "data", "gasto"]}>
                        {
                            serviceTable.map((service, index) => <DataTableService key={index} data={service} />)
                        }
                    </Table>
                </section>
            </main>
        </div>
    )
}
export default Service;