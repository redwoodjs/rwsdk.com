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
          README | {formattedDate}
        </span>
      </div>
      <img src="/images/logo--light.svg" alt="RedwoodSDK" className="h-10" />
      <div className="block md:hidden w-full">
        <img src="/images/hero-small.png" alt="Hero Image" className="w-full h-full" />
      </div>
    </div>
  );
}