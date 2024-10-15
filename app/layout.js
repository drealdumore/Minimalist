import "./globals.css";
import { sharedMetadata, SOCIALS } from "./utils/metadata";
import localFont from "next/font/local";
import Footer from "./components/footer";

const SpaceGrotesk = localFont({
  src: "../public/assets/fonts/SpaceGrotesk-Regular.ttf",
  variable: "--font-SpaceGrotesk",
});

export default function RootLayout({ children }) {
  
  return (
    <html
      lang="en"
      className={`w-full scroll-smooth px-2 py-8 ${SpaceGrotesk.variable}`}
    >
      <body>
        <main className="flex-grow flex items-center justify-center w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
  
  // return (
  //   <html
  //     lang="en"
  //     className={`flex items-center justify-center w-full scroll-smooth px-2 py-8 ${SpaceGrotesk.variable}`}
  //   >
  //     <body>
  //       {children}
  //       <Footer />
  //     </body>
  //   </html>
  // );
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
    images: sharedMetadata.image,
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
