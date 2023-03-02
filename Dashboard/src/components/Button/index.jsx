import "./style.css"
function Button({ title, ...rest }) {
    return (
        <div className="btn">
            <button {...rest}>{title}</button>
        </div>
    )
}
export default Button