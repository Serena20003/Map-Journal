const Button = ({className="", text="", action=null}) => {
    return (
        <>
        {action && <button onClick={action} className={className}>{text}</button>}
        {!action && <button className={className}>{text}</button>}
        </> 
    );
}
 
export default Button;