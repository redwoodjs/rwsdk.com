import { CloudflareImage } from './CloudflareImage';
import Constants from 'src/lib/Constants';

export const Navbar = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sticky top-0 bg-baige z-99 items-center py-4 px-4 sm:px-8">
      <CloudflareImage
        imageId="37162c6c-890c-48e3-790a-48b2b87fcd00"
        alt="logo"
        className="w-[140px] sm:w-[186px]"
      />
      <div className="flex gap-2 sm:gap-4 font-jersey text-[16px] sm:text-[20px] mt-4 sm:mt-0">
        <a href={Constants.DOCS_URL} className="hover:text-orange-medium transition-colors">Docs</a>
        <span className="text-orange-light">/</span>
        <a href={Constants.DISCORD_URL} className="hover:text-orange-medium transition-colors">Discord</a>
        <span className="text-orange-light">/</span>
        <a href={Constants.GITHUB_URL} className="hover:text-orange-medium transition-colors">Github</a>
        <span className="text-orange-light">/</span>
        <a href="/personal-software" className="hover:text-orange-medium transition-colors">Personal Software</a>
      </div>
    </div>
  );
}; 