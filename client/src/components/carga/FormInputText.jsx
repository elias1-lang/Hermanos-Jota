import React from "react";

function FormImputText({nameCampo,nameLabel,onChange,tipo="text",value,statusValid=true,onKeyDown, nombreClaseEspecial=""}){
    const inputClassName = !statusValid?"FORM_IMPUT_INVALID":"";

    return(
        <div>
            <label htmlFor={nameCampo}>{nameLabel}</label>
            <br/>
            <input className={`${inputClassName} ${nombreClaseEspecial}`} type={tipo} id={nameCampo} name={nameCampo} value={value} onChange={onChange} onKeyDown={onKeyDown}/>
        </div>
    );
}

export default FormImputText;