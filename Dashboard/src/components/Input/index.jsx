import "./style.css";
function Input({ id, title, icon, refs, ...rest }) {
  return (
    <>
      <label id="label" htmlFor={title}>
        {title}
      </label>
      <div className="search">
        {icon}
        <input type="text" ref={refs} {...rest} />
      </div>
    </>
  );
}
export default Input;
