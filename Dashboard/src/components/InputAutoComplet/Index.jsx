import "./style.css"
import Input from "../Input"
import { useState } from "react"
function InputAutoComplet({ data, value, setValue, ...rest }) {
    const [list, setList] = useState([])
    const autoComplet = () => {
        setList([])
        data.forEach(item => {
            if (item.produto.toLowerCase().startsWith(value) && value != '') {
                setList(prev => [...prev, item])
            }
            })
    }
    const selectField = (product) => {
        setValue(product.produto)
        setList([])
    }
    return (
        <div className="autocomplet-Container">
            <Input onKeyUp={autoComplet} value={value} onChange={e => setValue(e.target.value)} {...rest} />
            {list.length ?
                <ul className="list-input">
                    {list.map(el => <li key={el.id} onClick={() => selectField(el)}>{`${el.produto} - ${el.valor}`}</li>)}
                </ul>
                : null}
        </div>
    )
}
export default InputAutoComplet;