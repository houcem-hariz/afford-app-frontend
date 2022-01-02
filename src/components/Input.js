

function Input({type, id, label, placeholder, ...rest}) {
    return (
        <div style={{marginBottom: 10}}>
            <label className="form-label" htmlFor={id}>{label}</label>
            <input type={type} className="form-control" id={id} placeholder={placeholder} {...rest}  />
        </div>
    )
}

export default Input;