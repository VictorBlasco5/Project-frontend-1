import "./CInput.css";

export const CInput = ({className, placeholder, type, name, value, onChangeFunction }) => {

    return (
        <input 
            className={className}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChangeFunction}
        />
    )
}