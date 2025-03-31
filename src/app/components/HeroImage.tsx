export default function HeroImage() {
    return (
      <div className="hidden md:block sticky top-18 h-screen w-1/3 flex items-center justify-center">
        <img src="/images/hero.png" alt="Hero Image" className="w-full h-full object-cover" />
      </div>
    );
  }