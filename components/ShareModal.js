import Image from "next/image";
import { useRef } from "react";

const ShareModal = (props) => {
    const shareRef = useRef()
    const {
        handle_name,
        description,
        url
    } = props;

    const openMenu = () => {
        shareRef.current.style.height = "auto"
        shareRef.current.style.opacity = "1"
    }

    const closeMenu = () => {
        shareRef.current.style.height = "0"
        shareRef.current.style.opacity = "0"

    }

    let platforms = [
        {
            name: "WhatsApp",
            link: `https://wa.me/?text=Check%20out%20this%20LinkPool!%20${url}`,
            logo: "/logo/social.png"
        },
        {
            name: "Facebook",
            link: `https://www.facebook.com/sharer.php?u=${url}`,
            logo: "/logo/facebook.png"
        },
        {
            name: "X",
            link: `https://x.com/intent/tweet?text=${url}%20${description}`,
            logo: "/logo/twitter.png"
        },
        {
            name: "LinkedIn",
            link: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            logo: "/logo/linkedin.png"
        },
        {
            name: "Gmail",
            link: `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${handle_name}%20|%20LinkPool&body=${description}%20${url}`,
            logo: "/logo/gmail.png"
        }

    ]

    const moreOptions = async () => {
        const shareData = {
            title: `${handle_name} | Link Pool`,
            description: description,
            url: handle_name,
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData)
            } catch (error) {
                console.log("cancelled share");
            }
        } else {
            //fallback
            const description = encodeURIComponent(`Check this out! ${url}`)
            window.open(`https://wa.me/?description=${description}`, "_blank")
        }
    }

    const handleCopy = async (handle) => {
        try {
            await navigator.clipboard.writeText(url)
            toast.success("Copied to clipboard")
        } catch (err) {
            toast.error("Failed to copy")
        }
    }

    return (
        <>
            <div onClick={() => { openMenu() }} className="w-full flex">
                <button className="description-white bg-cyan-500 px-3 py-2 rounded-xl shadow-purple-700 shadow-sm" >Share</button>
            </div>
            <div id="shareModal" onClick={(e) => e.target.id === "shareModal" && closeMenu()} ref={shareRef} className="fixed top-0 overflow-hidden h-0 bottom-0 left-0 right-0   opacity-0 bg-gray-900/50 grid place-items-end p-3">

                {/* content */}
                <div className="mx-auto w-full max-w-3xl p-4 grid rounded-xl bg-slate-200 dark:bg-slate-800 description-black gap-2 ">
                    <h2 className="flex w-full place-content-between description-xl font-semibold">
                        <p>Share your link pool</p>
                        <button  onClick={closeMenu} className="px-4 py-2 description-sm rounded-full border bg-slate-200 dark:bg-slate-700/80">Close</button>
                    </h2>
                    <div className="grid gap-3">
                        <div className="flex flex-wrap gap-3">

                            {/* links */}
                            {platforms.map((platform, i) => (

                                < a key={i} href={platform.link} target="_blank" className="grid w-16 h-16 items-center" >
                                    <img className=" m-auto object-cover w-9" src={platform.logo} alt="profile pic" />
                                    <p className="text-center">{platform.name}</p>
                                </a>
                            ))}
                        </div>


                        {/* more options */}
                        <div className="flex flex-wrap gap-3">
                            <ul onClick={handleCopy} className="grid w-16 h-16 items-center">
                                <img className="rounded-xl m-auto object-cover dark:invert" src="/svg/copy-link-stroke-rounded.svg" alt="" />
                                <p className="text-center ">Copy</p>
                            </ul>
                            <ul onClick={moreOptions} className="grid w-16 h-16">
                                <img className="rounded-xl m-auto object-cover dark:invert" src="/svg/more-vertical-stroke-rounded.svg" alt="" />
                                <p className="text-center">More</p>
                            </ul>
                        </div>

                    </div>
                </div>

            </div >
        </>
    )
}

export default ShareModal;