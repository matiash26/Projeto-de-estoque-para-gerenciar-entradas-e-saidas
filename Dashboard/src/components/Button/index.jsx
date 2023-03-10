import "./style.css"
function Button({ title, color, ...rest }) {
    return (
        <div className="btn">
            <button {...rest}>{title}</button>
        </div>
    )
}
export default Button