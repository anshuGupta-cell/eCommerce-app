const { useRef, useState } = require("react")

const Dropdown = ({ children }) => {

    const sideMenuRef = useRef()
    const [menu, setmenu] = useState(false)

    const closeMenu = () => {
        sideMenuRef.current.style.display = "none"
        setmenu(false)

    }

    const openMenu = () => {
        if (!menu) {
            sideMenuRef.current.style.display = "block"
            setmenu(true)
        } else {
            closeMenu()
        }

        console.log("fhfgh");

    }

    return (
        <>
            <div className="relative ">
                <button onClick={openMenu} className="py-2 px-4 font-extrabold rounded-md bg-indigo-200 dark:bg-indigo-900/10  border border-purple-800 cursor-pointer">&#8942;</button>
                <div onClick={closeMenu} ref={sideMenuRef} className="hidden absolute p-2 rounded-xl ">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Dropdown