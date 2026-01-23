import { link } from "src/shared/links";

export default function Header() {
  return (
    <div className="z-10 py-4 px-6 lg:pr-16 flex items-center flex-col lg:block">
      <div className="flex justify-end">
        <span className="font-light tracking-tight leading-none text-[14px] lg:mb-2 mb-2 mx-2">
          PERSONAL SOFTWARE
        </span>
      </div>
      <a href={link("/")} aria-label="RedwoodSDK">
        <img
          src="/images/logo--light.svg"
          alt="RedwoodSDK"
          className="h-10 lg:hidden"
        />
      </a>
    </div>
  );
}
