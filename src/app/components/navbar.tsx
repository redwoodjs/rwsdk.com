import Constants from "src/lib/Constants";
import { link } from "src/shared/links";
import { GitHubStarWidget } from "./github-star-widget";
import { ScrollMonitoring } from "./scroll-monitoring";
import { ThemeToggle } from "./theme-toggle";
import { requestInfo } from "rwsdk/worker";

interface NavItem {
  href: string;
  label: string;
  activeKey?: string;
}

const navItems: NavItem[] = [
  { href: Constants.DOCS_URL, label: "Docs" },
  { href: "/#get-started", label: "Get started" },
  { href: link("/blog"), label: "Blog" },
  { href: link("/personal-software"), label: "Manifesto" },
];

interface NavLinkProps {
  href: string;
  label: string;
}

function NavLink({ href, label }: NavLinkProps) {
  return (
    <a href={href} className="hover:text-[#e05236] dark:hover:text-dark-accent transition-colors">
      {label}
    </a>
  );
}


interface NavbarProps {
  activePage?: string;
}

export function Navbar(props: NavbarProps) {
  const theme = requestInfo?.ctx?.theme || "system";

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
            padding-top: calc(1rem - (0.5rem * var(--scroll-progress, 0)));
            padding-bottom: calc(1rem - (0.5rem * var(--scroll-progress, 0)));
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
      <div className="h-[140px] md:h-auto w-full md:hidden" />
      <div className="fixed md:sticky top-0 left-0 w-full z-[99]">
        <div
          id="main-navbar"
          className="group flex flex-col md:flex-row justify-between bg-parchment dark:bg-dark-bg items-center w-full px-6 sm:px-8 border-b border-zinc-200/60 dark:border-dark-border shadow-none transition-colors duration-200"
        >
          <ScrollMonitoring />
          <a
            id="main-navbar-logo"
            className="cursor-pointer mb-4 md:mb-0 overflow-hidden"
            href={link("/")}
          >
            <img src="/images/logo--light.svg" alt="logo" width={186} height={29} className="w-[186px] dark:hidden" />
            <img src="/images/logo--dark.svg" alt="logo" width={186} height={29} className="w-[186px] hidden dark:block" />
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
              <span className="text-zinc-500 dark:text-dark-secondary !no-underline">
                <GitHubStarWidget />
              </span>
            </div>
            <ThemeToggle initialTheme={theme} />
          </div>
        </div>
      </div>
    </>
  );
}
