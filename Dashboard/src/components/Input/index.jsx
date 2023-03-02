import "./style.css"
function Input({ id, title, icon, refs, ...rest }) {
    return (
        <>
            <label id='label' htmlFor={id}>{title}</label>
            <div className="search">
                {icon}
                <input type="text" {...rest} ref={refs} min="1" max="5"/>
            </div>
        </>
    )
}
export default Input