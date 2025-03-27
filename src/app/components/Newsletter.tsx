"use client"

const Newsletter = () => {
  return (
    <div className="border-mySin border-[3px] mb-10 md:mb-[100px]">
      <header className="px-4 py-5 md:p-10 pt-6 md:pt-12 relative border-b-[3px] border-mySin">
        <h2 className="font-bold uppercase bg-mySin text-black px-5 leading-[1.75] inline-block absolute left-1/2 -translate-x-1/2 -top-4 whitespace-nowrap">BE THE FIRST TO KNOW</h2>
        <p className="text-sm md:text-base">Sign up for our newsletter to receive exclusive updates on our progress, early access opportunities, and comprehensive guides as we approach launch. Be among the first to try RedwoodSDK and see how it makes your development workflow faster and more enjoyable.</p>
      </header>
      <form action="https://kwesforms.com/api/foreign/forms/j3K2Y919pleglPFXuuAz" className="kf-form grid grid-cols-1 md:grid-cols-2 gap-x-[72px]">
        <div className="field mx-5 md:ml-10 md:mr-0">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" data-kw-rules="required" />
        </div>
        <div className="field mx-5 md:mr-10 md:ml-0">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" data-kw-rules="required|email" />
        </div>
        <footer className="md:col-span-2 bg-alpine border-t-[3px] border-mySin flex justify-end">
          <button type="submit" className="bg-mySin text-black px-5 py-2 uppercase font-bold flex items-center gap-2 hover:bg-cinnabar hover:text-white border-l-mySin border-l-[3px] cursor-pointer">
            <img src="/images/triangle.svg" alt="triangle right" />
            Subscribe
          </button>
        </footer>
      </form>
    </div>
  )
}

export { Newsletter }