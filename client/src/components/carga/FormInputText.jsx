import React from "react";

function FormImputText({nameCampo,nameLabel,onChange,tipo="text",value,statusValid=true,onKeyDown}){
    const inputClassName = !statusValid?"FORM_IMPUT_INVALID":"";
    return(
        <div>
            <label htmlFor={nameCampo}>{nameLabel}</label>
            <br/>
            <input className={inputClassName} type={tipo} id={nameCampo} name={nameCampo} value={value} onChange={onChange} onKeyDown={onKeyDown}/>
        </div>
    );
}

export default FormImputText;