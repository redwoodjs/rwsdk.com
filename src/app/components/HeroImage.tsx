export default function HeroImage() {
  return (
    <div className="lg:w-1/3 hidden lg:block">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <img src="/images/hero.png" alt="Hero Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}