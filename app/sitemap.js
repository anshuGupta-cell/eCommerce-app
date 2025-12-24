export default function sitemap () {
    return [
        {
            url: process.env.BASEURL,
            lastModified: new Date()
        },
        {
            url: `${process.env.BASEURL}/generate`,
            lastModified: new Date()
        },
        {
            url: `${process.env.BASEURL}/my-trees`,
            lastModified: new Date()
        },
        // {
        //     url: `https://link-pool.vercel.app/sitemap.xml`,
        //     lastModified: new Date()
        // },

    ]
}