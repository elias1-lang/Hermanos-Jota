import React from "react";

function FormOption({valueCampo,nameOption,selected,disabled}){
    return(
        <option value={valueCampo} disabled={disabled} selected={selected}>{nameOption}</option>
    );
}
export default FormOption;