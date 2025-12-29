import { useRef } from "react";
import Button from "../button/Button";
import { toast } from "react-toastify";

const Modal = (props) => {
    const {
        children,
        btnText,
        isActive
    } = props
    const modalref = useRef()

    // const {a } = params

    const closeMenu = () => {
        modalref.current.style.height = "0"
        modalref.current.style.opacity = "0"
    }
    const openMenu = () => {
        modalref.current.style.height = "auto"
        modalref.current.style.opacity = "1"
    }


    return (
        <>
            <div onClick={() => { isActive?openMenu(): toast("Plase add item(s) in cart") }} className="w-full flex" >
                <Button  >{btnText}</Button>
            </div>
            <div id="OptionsModal" ref={modalref} onClick={(e) => e.target.id === "OptionsModal" && closeMenu()} className="fixed top-0 overflow-hidden h-0 bottom-0 left-0 right-0   opacity-0 bg-gray-900/50 grid place-items-center p-3">
                <div className="w-full">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal;