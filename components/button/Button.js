import "./style.css"

const Button = ({children, ...props}) => {
    // console.log({...props});
    
    return (
        <button className="btn" {...props}>
            <div className="">{children}</div>
        </button>
    )
}

export default Button