"use client"
import Spinner from "@/components/Loader/Spinner"
import OptionsModal from "@/components/OptionsModal"
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime"
import { useSearchParams } from "next/navigation"
import React, { Suspense, use, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { setLoading } from "../redux/loader/loaderSlice"


const Generate = () => {

    const [links, setLinks] = useState([{ link: "", linkText: "" }])
    const [handle, setHandle] = useState("")
    const [pic, setPic] = useState("")
    const [desc, setDesc] = useState("")
    const [type, setType] = useState("public")
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.loader.loading)


    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const handle = params.get("handle")
        if (handle) setHandle(handle)
    }, [])


    const handleChange = (i, link, linkText) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, j) => {
                if (j == i) {
                    return { link, linkText }
                } else {
                    return item
                }
            })
        })

    }
    const onChangeHandle = (e) => {
        const newValue = e.target.value.replace(/\s+/g, "-")
        setHandle(newValue)
    }

    const addLink = () => {
        setLinks(links.concat({ link: "", linkText: "" }))
    }
    const removeLink = (i) => {
        if (links.length === 1) {
            toast("Atleat 1 link is required")

        }
        console.log(links.length);
        setLinks(links.filter((_, j) => j !== i))
    }

    const submitLinks = async (e) => {
        dispatch(setLoading(true))
        e.preventDefault()
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
        console.log("type", type);


        let bodyContent = JSON.stringify({
            links,
            handle,
            pic,
            desc,
            type
        });
        console.log(bodyContent);


        let response = await fetch("/api/add", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        dispatch(setLoading(false))

        let data = await response.json();
        if (data.success) {
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }

        setHandle("")
        setLinks([{ link: "", text: "" }])
        setPic("")
        setType("public")
        setDesc("")
    }

    return (
        <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-red-50 py-32 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-700 ">

            <div className="m-auto max-w-6xl py-6 rounded grid gap-4 bg-white dark:bg-black/10">


                <form onSubmit={(e) => submitLinks(e)} className="w-[95%] p-4 mx-auto grid gap-4 focus-within:outline outline-2 outline-gray-800 dark:outline-gray-500 rounded-lg dark:text-white/80">
                    <div className="font-semibold text-3xl ">
                        <h1 >Create your link in bio</h1>
                    </div>
                    <div className="grid gap-2">
                        <h1 className="font- text-lg" >Step 1. Create your handle</h1>
                        <div>
                            <input name="handle" className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80" type="text" value={handle || ""} onChange={(e) => onChangeHandle(e)} placeholder="Enter your handle" required />
                        </div>
                        <p className="text-sm">Note: White spaces will be replced by "-"</p>
                    </div>
                    <div className="grid gap-2 ">
                        <h3 className="font- text-lg">
                            Step 2. Add profile picture link & description about links
                        </h3>
                        <div className="">
                            <input name="pic" className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80" type="text" value={pic || ""} onChange={(e) => { setPic(e.target.value) }} placeholder="Enter link to your image" required />
                        </div>
                        <div className="">
                            <textarea name="dis" rows={5} className="text-black rounded-lg w-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80" type="text" value={desc || ""} onChange={(e) => { setDesc(e.target.value) }} placeholder="Enter description" required />
                        </div>

                    </div>
                    <div className="grid gap-2">
                        <h3 className="font- text-lg">Step 3. Manage who can see this LinkPool</h3>
                        <ul className="w-[92%] grid res-grid-200 gap-2 ">
                            <label name="type" className={`flex gap-2 p-2 rounded-lg items-center cursor-pointer border-2 border-gray-600/20 ${type === 'public'? 'border-indigo-400 bg-indigo-200 dark:bg-indigo-600/25' : ''}`}>
                                <input className="size-5 accent-purple-600" name="type" type="radio" value="public" onChange={(e) => setType(e.target.value)} defaultChecked /> Public
                            </label>
                            <label  className={`flex gap-2 p-2 rounded-lg items-center cursor-pointer border-2 border-gray-600/20 ${type === 'private'? 'border-indigo-400 bg-indigo-200 dark:bg-indigo-600/25' : ''}`}>
                                <input className="size-5 accent-purple-600" name="type" type="radio" value="private" onChange={(e) => setType(e.target.value)} /> Private
                            </label>
                        </ul>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="font- text-lg">Step 4. Add link and link text</h3>
                        <div className="border rounded-lg py-1">

                            {links && links.map((item, i) => (
                                <div className="flex justify-around opacity-95 p-1  relative" key={i} >
                                    <div className="w-[92%] grid res-grid-200 gap-2 " >
                                        <input name="linkText" className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80" type="text" value={item.linkText || ""} onChange={(e) => handleChange(i, item.link, e.target.value)} placeholder="Enter link text" required />
                                        <input name="link" className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80" type="link" value={item.link || ""} onChange={(e) => handleChange(i, e.target.value, item.linkText)} placeholder="Enter link" required />

                                    </div>
                                    <div>

                                        <button type="button" disabled={links.length == 1} className="py-1" onClick={() => removeLink(i)}>
                                            <div className="btn transform-bg hover:bg-slate-200 p-1 rounded-full">
                                                <img className="dark:invert object-cover rounded-full w-[0.8rem] h-[0.8rem]" src="/svg/xmark-regular.svg" alt="remove" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="rounded-lg active:scale-95 py-1 px-2 bg-slate-800 dark:bg-pink-700 shadow-purple-600 shadow-md text-sm text-white w-fit" onClick={addLink} >Add Link</button>

                    </div>

                    <div className="flex justify-end ">
                        <button type="submit" className="text-white bg-purple-700 px-3 py-2 rounded-xl shadow-pink-600 shadow-md">Create your bitlink</button>
                    </div>
                </form>
            </div>
            {isLoading && <div className="fixed top-0 overflow-hidden bottom-0 left-0 right-0 bg-gray-900/50 grid place-items-center p-3">
                <Spinner />
            </div>}
        </div>
    )
}

export default Generate