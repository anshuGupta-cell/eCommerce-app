"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton
} from "@clerk/nextjs"


const Navbar = () => {
    const pathName = usePathname()
    const [expanded, setExpanded] = useState(false)
    const showNavbar = ["/", "/generate", "/about", "/my-trees", "/contact"].includes(pathName)
    const active = "rounded-lg font-bold text-lg"
    const [isDarkMode, setIsDarkMode] = useState(false)
    const sideMenuRef = useRef()

    useEffect(() => {
        if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true)
        } else {
            setIsDarkMode(false)

        }
    }, [])

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
            localStorage.theme = "dark"
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.theme = ""

        }
    }, [isDarkMode])


    const openMenu = () => {
        sideMenuRef.current.style.transform = "translateX(-10.8rem)"
    }
    const closeMenu = () => {
        sideMenuRef.current.style.transform = "translateX(10rem)"
    }




    return (
        <>
            {showNavbar && <div className="fixed z-40 top-0 text-sm w-[100vw] p-2 bg-[#f1f5f578] dark:bg-[#0e0a0a78] backdrp-blur-lg">
                <div className="z-10 mx-auto max-w-[90vw]  rounded-full shadow-sm bg-slate-100  dark:shadow-white/20 dark:bg-slate-800 dark:text-salte-300">
                    <div className="flex  items-center justify-between md:justify-around p-2 gap-3 flex-wrap">

                        <div className="flex items-center bg-gradient-to-bl rounded-xl">
                            <Link className="p-2 text-xl font-bold " href="/">
                                Link Pool
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center py-2 px-3 text-nowrap text-slate-600 dark:text-slate-300 gap-1 bg-ma-100 dark:bg-slate-700 rounded-full">
                            <Link onClick={closeMenu} className={`p-2 ${pathName == "/" ? active : ""}`} href="/">Home</Link>
                            <Link onClick={closeMenu} className={`p-2 ${pathName == "/generate" ? active : ""}`} href="/generate">Generate</Link>
                            <Link onClick={closeMenu} className={`p-2 ${pathName == "/my-trees" ? active : ""}`} href="/my-trees">My trees</Link>
                            {/* <Link onClick={closeMenu} className={`p-2 ${pathName == "/about" ? active : ""}`} href="/about">About</Link>
                            <Link onClick={closeMenu} className={`p-2 ${pathName == "/contact" ? active : ""}`} href="/contact">Contact me</Link> */}
                        </div>

                        <div className="flex gap-2 items-center">

                            <button onClick={() => { setIsDarkMode(!isDarkMode) }} className="p-2 rounded-full hover:bg-slate-300 dark:hover:bg-darkHover">
                                <img className="w-5 h-5 dark:invert" src={`${isDarkMode ? "/svg/moon-02-stroke-rounded.svg" : "/svg/sun-02-stroke-rounded.svg"}`} alt="theme" />
                            </button>

                            <div className="flex">
                                <SignedOut>
                                    <SignInButton />
                                    <SignUpButton>
                                        <button className="ml-2 bg-purple-400 text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                                            Sign Up
                                        </button>
                                    </SignUpButton>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </div>

                            <button onClick={openMenu} className="p-2 rounded-full hover:bg-slate-300 dark:hover:bg-darkHover block md:hidden lg:hidden " >
                                <img className="w-5 h-5 dark:invert" src="/svg/bars-solid.svg" alt="hamburger" />
                            </button>

                        </div>


                    </div>
                </div>

                {/* mobile menu */}

                <div ref={sideMenuRef} className="fixed grid w-40 top-2 -right-40 md:hidden p-3 text-nowrap   gap-1 bg-slate-100 dark:bg-slate-900 z-10 mx-auto rounded-xl transition duration-500 text-slate-600 dark:text-slate-300 ">

                    <button onClick={closeMenu} className="p-2 rounded-full hover:bg-slate-300 dark:hover:bg-darkHover block md:hidden lg:hidden place-self-end">
                        <img className="w-5 h-5 dark:invert " src="/svg/xmark-regular.svg" alt="cross" />
                    </button>

                    <Link onClick={closeMenu} className={`p-2 ${pathName == "/" ? active : ""}`} href="/">Home</Link>
                    <Link onClick={closeMenu} className={`p-2 ${pathName == "/generate" ? active : ""}`} href="/generate">Generate</Link>
                    <Link onClick={closeMenu} className={`p-2 ${pathName == "/my-trees" ? active : ""}`} href="/my-trees">My trees</Link>
                    {/* <Link onClick={closeMenu} className={`p-2 ${pathName == "/about" ? active : ""}`} href="/about">About</Link>
                    <Link onClick={closeMenu} className={`p-2 ${pathName == "/contact" ? active : ""}`} href="/contact">Contact me</Link> */}

                </div>

            </div>}
        </>

    )
}

export default Navbar;

