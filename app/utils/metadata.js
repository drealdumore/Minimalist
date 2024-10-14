export const sharedMetadata = {
  title: "Minimalist",
  description: "Minimal accessible todo app.",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://minimal-list.vercel.app",
  ogImage: {
    width: 1200,
    height: 630,
    type: "image/png",
  },
  image: "./og.png",
};

export const SOCIALS = {
  twitter: {
    title: "X (Twitter)",
    username: "drealdumore",
    url: "https://twitter.com/drealdumore",
  },

  github: {
    title: "GitHub",
    url: "https://github.com/drealdumore",
  },

  linkedin: {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/samuel-isah",
  },
};
