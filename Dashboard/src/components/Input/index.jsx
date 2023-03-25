import "./style.css"
function Input({ id, title, icon, refs, ...rest }) {
    return (
        <>
            <label id='label' htmlFor={id}>{title}</label>
            <div className="search">
                {icon}
                <input type="text" {...rest} ref={refs}/>
            </div>
        </>
    )
}
export default Input