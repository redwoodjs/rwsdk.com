export default function Header() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-ZA', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });
  return (
    <div className="z-10 py-4 px-6 md:pr-16 flex items-center flex-col md:block">
      <div className="flex justify-end">
        <span className="font-jersey-charted text-orange font-light tracking-tight leading-none text-[20px] md:mb-10 mb-2 mx-2">
          PS | {formattedDate}
        </span>
      </div>
      <a href="/" aria-label="RedwoodSDK">
        <img src="/images/logo--light.svg" alt="RedwoodSDK" className="h-10" />
      </a>
    </div>
  );
}