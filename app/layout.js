import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import {
  ClerkProvider
} from "@clerk/nextjs"
import Providers from "./provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Link Pool - All in one link in bio",
  description: "Create your link pool. All your links at one place. Create smart link pages with custom handles and links.",
  keywords: ["linktree clone", "smart links", "profile link"],
  other: {
    "google-site-verification": "DgqwRpq7L5WqCJCs_ePpKGvaDkGYPGl2MGNgN8q3ZuE"
  }
};

export default function RootLayout({ children }) {

  return (
    <Providers>
      <ClerkProvider>
        <html lang="en">
          <body className={` antialiased dark:text-white/80 dark:bg-slate-800`}>

            <ToastContainer />
            <Navbar />
            {children}

          </body>
        </html>
      </ClerkProvider>
    </Providers>
  )
}
