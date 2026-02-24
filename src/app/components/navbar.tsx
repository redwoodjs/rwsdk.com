import { CloudflareImage } from "./cloudflare-image";
import Constants from "src/lib/Constants";
import { link } from "src/shared/links";
import { GitHubStarWidget } from "./github-star-widget";
import { ScrollMonitoring } from "./scroll-monitoring";

interface NavItem {
  href: string;
  label: string;
  activeKey?: string;
}

const navItems: NavItem[] = [
  { href: Constants.DOCS_URL, label: "Docs" },
  { href: "/#get-started", label: "Get started" },
  { href: link("/blog"), label: "Blog" },

];

interface NavLinkProps {
  href: string;
  label: string;
}

function NavLink({ href, label }: NavLinkProps) {
  return (
    <a href={href} className="hover:text-[#e05236] transition-colors">
      {label}
    </a>
  );
}


interface NavbarProps {
  activePage?: string;
}

export function Navbar(props: NavbarProps) {
  return (
    <div
      id="main-navbar"
      className="group flex flex-col md:flex-row justify-between sticky top-0 bg-parchment z-[99] items-center max-w-7xl w-full mx-auto pt-8 pb-6 px-6 sm:px-8 border-b border-zinc-200/60 transition-all duration-200 shadow-none data-[scrolled=true]:pt-4 data-[scrolled=true]:pb-2"
    >
      <ScrollMonitoring />
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
      <div className="flex flex-wrap md:flex-nowrap whitespace-nowrap items-center justify-center gap-4 md:gap-6 font-sans text-sm font-medium mt-4 md:mt-0 transition-all duration-300 max-md:group-data-[scrolled=true]:mt-0">
        {navItems.map((item) => (
          <NavLink key={item.label} href={item.href} label={item.label} />
        ))}
        <div className="inline-flex items-center gap-2 leading-none">
          <a
            href={Constants.GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-medium transition-colors"
          >
            GitHub
          </a>
          <span className="text-zinc-500 !no-underline">
            <GitHubStarWidget />
          </span>
        </div>
      </div>
    </div>
  );
}
