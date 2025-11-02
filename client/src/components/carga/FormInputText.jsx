import React from "react";

function FormImputText({nameCampo,nameLabel,onChange,tipo="text",value}){
    return(
        <div>
            <label htmlFor={nameCampo}>{nameLabel}</label>
            <br/>
            <input type={tipo} id={nameCampo} name={nameCampo} value={value} onChange={onChange}/>
        </div>
    );
}

export default FormImputText;