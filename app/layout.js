
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Minimalist",
  description: "Minimal accessible todo app.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="flex items-center justify-center w-full scroll-smooth px-2 py-8"
    >
      <body
        className={`${inter.className} bg-primary transition-all duration-700`}
      >
        {children}
      </body>
    </html>
  );
}
