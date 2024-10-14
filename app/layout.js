import { Inter } from "next/font/google";
import "./globals.css";
import { sharedMetadata, SOCIALS } from "./utils/metadata";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const SpaceGrotesk = localFont({
  src: "../assets/fonts/SpaceGrotesk-Regular.ttf",
  variable: "--font-SpaceGrotesk",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`flex items-center justify-center w-full scroll-smooth px-2 py-8 ${SpaceGrotesk.variable}`}
    >
      <body
        className={`${inter.className} bg-primary transition-all duration-700 font-SpaceGrotesk`}
      >
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  metadataBase: new URL(sharedMetadata.url),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  title: {
    default: sharedMetadata.title,
    template: `%s — ${sharedMetadata.title}`,
  },
  description: sharedMetadata.description,
  keywords: ["Minimalist", "todo app", "todo", "drealdumore"],
  openGraph: {
    title: {
      default: sharedMetadata.title,
      template: `%s — ${sharedMetadata.title}`,
    },
    description: sharedMetadata.description,
    type: "website",
    url: sharedMetadata.url,
    siteName: sharedMetadata.title,
    locale: "en_IE",
    // images: sharedMetadata.image,
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: `@${SOCIALS.twitter.username}`,
    creator: `@${SOCIALS.twitter.username}`,
  },
};
