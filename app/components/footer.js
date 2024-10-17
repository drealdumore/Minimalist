import Link from "next/link";
import { SOCIALS } from "../utils/metadata";
import Clock from "./clock";

export default function Footer() {
  return (
    <footer className="w-full text-center py-4 border-t mt-auto">
      <div className="flex justify-center space-x-4 mb-2">
        <Link href={SOCIALS.twitter.url} passHref>
          <p
            className="hover:text-neutral-500 cursor-alias text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </p>
        </Link>
        <Link href={SOCIALS.github.url} passHref>
          <p
            className="hover:text-neutral-500 cursor-alias text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </p>
        </Link>
        <Link href={SOCIALS.linkedin.url} passHref>
          <p
            className="hover:text-neutral-500 cursor-alias text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </p>
        </Link>
      </div>
      <p className="text-sm text-neutral-600">
        © {new Date().getFullYear()} Minimalist Todo App. All rights reserved.
      </p>

      <div className="flex items-center justify-center size-6 w-full mt-3">
        <Clock />
      </div>
    </footer>
  );
}
