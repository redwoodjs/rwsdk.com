import { CloudflareImage } from "./CloudflareImage";
import Constants from "src/lib/Constants";
import { link } from "src/shared/links";
import { GitHubStarWidget } from "./GitHubStarWidget";

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
    <div className="flex flex-col lg:flex-row justify-between sticky top-0 bg-baige z-99 items-center py-4 px-4 sm:px-8 transition-shadow duration-200">
      <a className="cursor-pointer" href={link("/")}>
        <CloudflareImage
          imageId="37162c6c-890c-48e3-790a-48b2b87fcd00"
          alt="logo"
          className="w-[140px] sm:w-[186px] sm:mb-4 lg:mb-0"
        />
      </a>
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap- font-noto font-bold text-[14px] sm:text-[16px] md:text-[18px] mt-4 lg:mt-0">
        {navItems.map((item, index) => (
          <span key={item.label} className="contents">
            <NavLink href={item.href} label={item.label} />
            {index < navItems.length - 1 && <NavSeparator />}
          </span>
        ))}
        <NavSeparator />
        <a
          href={Constants.GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 leading-none"
        >
          GitHub
          <span className="!text-slate-400 !no-underline">
            <GitHubStarWidget />
          </span>
        </a>
      </div>
    </div>
  );
}
