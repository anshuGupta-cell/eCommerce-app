import { useState } from "react";

const Modal = (props) => {

    const {
        newHandle,
        setNewHandle,
        newPfp_url,
        setNewPfp_Url,
        newDesc,
        setNewDesc,
        updateHandle,
        setModalState,
        setNewType,
        newType
    } = props;




    return (
        <div id="updateHandle" onClick={(e) => { e.target.id === 'updateHandle' && setModalState(false) }} className="fixed top-0 left-0 w-screen h-screen bg-black/50 overflow-hidden">
            <div id="updateHandle" onClick={(e) => { e.target.id === 'updateHandle' && setModalState(false) }} className="w-screen h-screen overflow-hidden m-auto rounded-lg p-3 grid gap-2">
                <form onSubmit={(e) => updateHandle(e)} className="md:w-[720] my-auto bg-slate-100 dark:bg-slate-700  p-4 mx-auto grid gap-2  rounded-lg ">

                    <div className="font-semibold text-3xl flex justify-between items-center p-2 bg-slate-800/10 rounded-xl">
                        <h1>Update handle </h1>
                        <button onClick={(e) => { setModalState(false) }} className="grid place-content-center rounded-xl bg-indigo-200 dark:bg-indigo-900/10 py-2 px-3 border border-purple-800 ">
                            <img  className="w-5 dark:invert" src="/svg/xmark-regular.svg" alt="close" />
                        </button>
                    </div>

                    <div className="grid gap-2">
                        <h1 className="font- text-lg" >Enter new handle name</h1>
                        <div>
                            <input name="handle" className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-200 dark:bg-slate-600 dark:text-white/80" type="text" value={newHandle || ""} onChange={(e) => setNewHandle(e.target.value)} placeholder="Enter your handle" required />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <h1 className="font- text-lg" >Manage visibility</h1>
                        <div>
                            <ul className="w-[92%] grid res-grid-200 gap-2 ">
                                <label name="type" className={`flex gap-2 p-2 rounded-lg items-center cursor-pointer border-2 border-gray-600/20 ${newType === 'public'? 'border-indigo-400 bg-indigo-200 dark:bg-indigo-600/25' : ''}`}>
                                    <input className="size-5 accent-purple-600" name="type" type="radio" value="public"
                                        onChange={(e) => setNewType(e.target.value)}
                                        checked={newType === 'public'}
                                    /> Public
                                </label>
                                <label name="type" className={`flex gap-2 p-2 rounded-lg items-center cursor-pointer border-2 border-gray-600/20 ${newType === 'private'? 'border-indigo-400 bg-indigo-200 dark:bg-indigo-600/25' : ''}`}>
                                    <input className="size-5 accent-purple-600" name="type" type="radio" value="private"
                                        onChange={(e) => setNewType(e.target.value)}
                                        checked={newType === "private"}
                                    /> Private
                                </label>
                            </ul>
                        </div>
                    </div>

                    <div className="grid gap-2 ">
                        <h3 className="font- text-lg">Enter new profile picture url</h3>
                        <div className="">
                            <input name="pic" className=" rounded-full focus:outline-green-500 py-1 px-3 bg-slate-200 dark:bg-slate-600 dark:text-white/80" type="text" value={newPfp_url || ""} onChange={(e) => { setNewPfp_Url(e.target.value) }} placeholder="Enter link to your image" required />
                        </div>
                        <h3>Enter new profile picture url</h3>
                        <div className="">
                            <textarea name="dis" className="w-full text-black rounded-lg focus:outline-green-500 py-1 px-3 bg-slate-200 dark:bg-slate-600 dark:text-white/80" type="text" value={newDesc || ""} onChange={(e) => { setNewDesc(e.target.value) }} placeholder="Enter description" required rows={5} />
                        </div>

                        <button type="submit" className="mx-auto rounded-lg shadow hover:scale-95 py-3 px-4 bg-slate-800 text-sm text-white w-fit">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal;