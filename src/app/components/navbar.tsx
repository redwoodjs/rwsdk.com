import { CloudflareImage } from "./cloudflare-image";
import Constants from "src/lib/Constants";
import { link } from "src/shared/links";
import { GitHubStarWidget } from "./github-star-widget";
import { ScrollShadow } from "./scroll-shadow";

interface NavItem {
  href: string;
  label: string;
  activeKey?: string;
}

const navItems: NavItem[] = [
  { href: Constants.DOCS_URL, label: "Docs" },
  { href: link("/blog"), label: "Blog" },
  { href: link("/hire-us"), label: "Hire us" },
];

interface NavLinkProps {
  href: string;
  label: string;
}

function NavLink({ href, label }: NavLinkProps) {
  return (
    <a href={href} className="hover:text-orange-medium transition-colors">
      {label}
    </a>
  );
}

function NavSeparator() {
  return <span className="text-slate-200">|</span>;
}

interface NavbarProps {
  activePage?: string;
}

export function Navbar(props: NavbarProps) {
  return (
    <div
      id="main-navbar"
      className="group flex flex-col md:flex-row justify-between sticky top-0 bg-parchment z-99 items-center py-4 px-4 sm:px-8 md:px-12 transition-all duration-200 shadow-none max-md:group-data-[scrolled=true]:py-2"
    >
      <ScrollShadow />
      <a
        className="cursor-pointer mb-4 md:mb-0 transition-all duration-300 overflow-hidden max-h-[100px] opacity-100 max-md:group-data-[scrolled=true]:max-h-0 max-md:group-data-[scrolled=true]:opacity-0 max-md:group-data-[scrolled=true]:mb-0"
        href={link("/")}
      >
        <CloudflareImage
          imageId="37162c6c-890c-48e3-790a-48b2b87fcd00"
          alt="logo"
          className="w-[186px]"
        />
      </a>
      <div className="flex flex-nowrap whitespace-nowrap justify-center gap-1 sm:gap-2 font-sans font-bold text-sm sm:text-[16px] mt-4 md:mt-0 transition-all duration-300 max-md:group-data-[scrolled=true]:mt-0">
        {navItems.map((item, index) => (
          <span key={item.label} className="contents">
            <NavLink href={item.href} label={item.label} />
            {index < navItems.length - 1 && <NavSeparator />}
          </span>
        ))}
        <NavSeparator />
        <div className="inline-flex items-center gap-2 leading-none">
          <a
            href={Constants.GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-medium transition-colors"
          >
            GitHub
          </a>
          <span className="!text-slate-400 !no-underline">
            <GitHubStarWidget />
          </span>
        </div>
      </div>
    </div>
  );
}
