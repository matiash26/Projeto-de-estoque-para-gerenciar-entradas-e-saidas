import { GlobalContext } from "../../Contexts/GlobalContext"
import { useContext } from "react"
import { BiSearch } from "react-icons/bi"
import Button from "../../components/Button"
import Select from "../Select"
import Input from "../../components/Input"
import "./style.css"

function NavbarSearch(props) {
    const { btnModalIsOpen } = useContext(GlobalContext)
    return (
        <form onSubmit={e => e.preventDefault(e)} className="form-filter">
            <div className="filter-container">
                {props.withDate ? (
                    <>
                        <div className="filter-date">
                            <label htmlFor="date" id="label">entrada</label>
                            <input type="date" name="date" id="date" ref={props.entrada} />
                        </div>
                        <div className="filter-date">
                            <label htmlFor="date" id="label">saida</label>
                            <input type="date" name="date" id="date" ref={props.saida} />
                        </div>
                    </>
                ) :
                    <>
                        <div className="filter-search">
                            <Input placeholder="Buscar Produto..." title="Pesquisar" icon={<BiSearch />} refs={props.search} />
                        </div>
                        <div className="filter-active">
                            <label htmlFor="active" id="label">status</label>
                            <Select title="active" refs={props.status}>
                                <option value="1">ativado</option>
                                <option value="0">desativado</option>
                            </Select>
                        </div>
                    </>
                }
            </div>
            <div className="btn-main">
                <Button title="ADICIONAR" className="blue" onClick={btnModalIsOpen} />
                <Button title="FILTRAR" className="blue" onClick={props.btnFilter} />
            </div>
        </form >
    )
}
export default NavbarSearch