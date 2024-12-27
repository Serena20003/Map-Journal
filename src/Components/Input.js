const Input = ({value, setValue, id, type="text", className="", required="true", label=null}) => {
    return ( 
        <>
        {required==="true" && label && <label>{label+"*"}</label>}
        {required==="false" && label && <label>{label}</label>}
        {required==="true" && <input id={id} type={type} required className={className} value={value} onChange={(e) => setValue(e.target.value)}/>}
        {required==="false" && <input id={id} type={type} className={className} value={value} onChange={(e) => setValue(e.target.value)}/>}
        </> 
    );
}
 
export default Input;