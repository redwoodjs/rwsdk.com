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
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Default base/desktop styles */
        #main-navbar {
          padding-top: 2rem;
          padding-bottom: 1.5rem;
          overflow-anchor: none;
        }
        #main-navbar-logo {
          max-height: 100px;
          opacity: 1;
        }

        @media (max-width: 767px) {
          #main-navbar {
            padding-top: calc(2rem - (1rem * var(--scroll-progress, 0)));
            padding-bottom: calc(1.5rem - (1rem * var(--scroll-progress, 0)));
          }
          #main-navbar-logo {
            max-height: calc(100px * (1 - var(--scroll-progress, 0)));
            opacity: calc(1 - var(--scroll-progress, 0));
            margin-bottom: calc(1rem * (1 - var(--scroll-progress, 0)));
          }
          #main-navbar-links {
            margin-top: calc(1rem * (1 - var(--scroll-progress, 0)));
          }
        }
      `}} />
      {/* Placeholder to prevent layout shift */}
      <div className="h-[212px] md:h-auto w-full md:hidden" />
      <div className="fixed md:sticky top-0 left-0 w-full z-[99]">
        <div
          id="main-navbar"
          className="group flex flex-col md:flex-row justify-between bg-parchment items-center max-w-7xl w-full mx-auto px-6 sm:px-8 border-b border-zinc-200/60 shadow-none"
        >
          <ScrollMonitoring />
          <a
            id="main-navbar-logo"
            className="cursor-pointer mb-4 md:mb-0 overflow-hidden"
            href={link("/")}
          >
            <CloudflareImage
              imageId="37162c6c-890c-48e3-790a-48b2b87fcd00"
              alt="logo"
              className="w-[186px]"
            />
          </a>
          <div id="main-navbar-links" className="flex flex-wrap md:flex-nowrap whitespace-nowrap items-center justify-center gap-4 md:gap-6 font-sans text-sm font-medium mt-4 md:mt-0">
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
      </div>
    </>
  );
}
