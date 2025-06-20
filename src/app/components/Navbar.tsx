import { CloudflareImage } from "./CloudflareImage";
import Constants from "src/lib/Constants";
import { GitHubStarWidget } from "./GitHubStarWidget";
import { Suspense } from "react";

interface NavbarProps {
  activePage?: string;
}

export function Navbar(props: NavbarProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between sticky top-0 bg-baige z-99 items-center py-4 px-4 sm:px-8 transition-shadow duration-200">
      <a className="cursor-pointer" href="/">
        <CloudflareImage
          imageId="37162c6c-890c-48e3-790a-48b2b87fcd00"
          alt="logo"
          className="w-[140px] sm:w-[186px] sm:mb-4 lg:mb-0"
        />
      </a>
      <div className="flex gap-2 sm:gap-4 font-noto font-bold text-[16px] sm:text-[18px]">
        <a
          href={Constants.DOCS_URL}
          className="hover:text-orange-medium transition-colors"
        >
          Docs
        </a>
        <span className="text-orange-light">\</span>
        <a
          href="/personal-software"
          className={`hover:text-orange-medium transition-colors ${
            props.activePage === "personal-software" ? "text-orange-medium" : ""
          }`}
        >
          Personal Software
        </a>
        <span className="text-orange-light">\</span>
        <a
          href="/blog"
          className={`hover:text-orange-medium transition-colors ${
            props.activePage === "blog" ? "text-orange-medium" : ""
          }`}
        >
          Blog
        </a>
        <span className="text-orange-light">\</span>
        <a
          href={Constants.DISCORD_URL}
          className="hover:text-orange-medium transition-colors"
        >
          Discord
        </a>
        <span className="text-orange-light">\</span>
        <Suspense fallback={<div>Loading...</div>}>
          <GitHubStarWidget />
        </Suspense>
      </div>
    </div>
  );
}
