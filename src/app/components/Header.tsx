export default function Header() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-ZA', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });
  return (
    <div className="z-10 py-4 px-6 lg:pr-16 flex items-center flex-col lg:block">
      <div className="flex justify-end">
        <span className="font-light tracking-tight leading-none text-[20px] lg:mb-2 mb-2 mx-2">
          PERSONAL SOFTWARE | <span className="text-orange">{formattedDate}</span>
        </span>
      </div>
      <a href="/" aria-label="RedwoodSDK">
        <img src="/images/logo--light.svg" alt="RedwoodSDK" className="h-10 lg:hidden" />
      </a>
    </div>
  );
}