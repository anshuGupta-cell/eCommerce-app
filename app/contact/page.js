
export async function generateMetadata  ()  {

    return {
        title: "amshu",
        description: "desc",
    }
}

// export const metadata = {
//     title: "shivani",
//     description: "contact shivani",
// }

const Contact = async () => {

    // const { isAuthenticated } = await auth()
    // if (!isAuthenticated) {
    //     return <>sign in to view this page</>
    // }

    // const user = await currentUser()

    // console.log(user);

    return (
        <>
            {/* <div className="mt-40">welcome , {user.firstName}{user.id}!</div> */}

            I am contact
        </>
    )
}

export default Contact;