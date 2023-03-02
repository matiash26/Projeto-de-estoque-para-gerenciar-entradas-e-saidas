import { useState } from "react";
import "./style.css"
function CheckBox({ icon01, icon02, title, refs, ...rest}) {
    return (
        <div className="checkBox-container">
            <div>
                <label htmlFor="checkboxStock" id="label">{title}</label>
                <div className="checkboxContent">
                    {icon01}
                    <input type="checkbox" id="checkboxStock" ref={refs} {...rest}/>
                    {icon02}
                </div>
            </div>
        </div>
    )
}
export default CheckBox;