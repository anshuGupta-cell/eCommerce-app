import { useRef } from "react";

const OptionsModal = ({children}) => {

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
            <div onClick={() => { openMenu() }} className="w-full flex">
                <button className="text-white bg-cyan-500 px-3 py-2 rounded-xl shadow-purple-700 shadow-sm" >Share</button>
            </div>
            <div id="OptionsModal" ref={modalref} onClick={(e) => e.target.id === "OptionsModal" && closeMenu()} className="fixed top-0 overflow-hidden h-0 bottom-0 left-0 right-0   opacity-0 bg-gray-900/50 grid place-items-center p-3">
                <div className="bg-green-900">
                    {children}
                </div>
            </div>
        </>
    )
}

export default OptionsModal;