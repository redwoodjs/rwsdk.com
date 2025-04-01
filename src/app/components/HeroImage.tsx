export default function HeroImage() {
  return (
    <div className="md:w-1/3 hidden md:block">
      <div className="sticky top-18 h-screen w-full flex items-center justify-center">
        <img src="/images/hero.png" alt="Hero Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}