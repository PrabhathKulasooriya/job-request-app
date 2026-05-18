import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./_components/Navbar";
import AppContextProvider from "./_context/AppContext.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Job Board",
  description: "Job board",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-center" reverseOrder={false} />
        <AppContextProvider>
        <Navbar/>
        <main id="main-scroll" className="flex-1 w-full overflow-y-auto">
          {children}
        </main>
        </AppContextProvider>
      </body>
    </html>
  );
}
