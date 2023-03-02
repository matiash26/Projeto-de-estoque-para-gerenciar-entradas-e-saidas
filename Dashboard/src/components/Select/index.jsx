
import "./style.css"
function Select({ title, children, refs, label, ...rest }) {
    return (
        <div className="select-container">
            <select name={title} id="select" ref={refs} {...rest} defaultValue="">
                {label && <option value=""disabled hidden>{label}</option>}
                {children}
            </select>
        </div>
    )
}
export default Select