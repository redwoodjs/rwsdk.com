import Header from "src/components/Header";
import HeroImage from "src/components/HeroImage";

export default function ReadMe() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen font-chivo bg-[#EDEBE6] text-black">
            <HeroImage />

            <div className="flex-1 flex flex-col">
                <div className="sticky top-0 z-10 bg-[#EDEBE6]">
                    <Header />
                </div>

                <main className="flex-1 overflow-y-auto pr-6 md:pr-16 py-8 space-y-12">
                    <section className="space-y-6">
                        <h1 className="font-jersey-charted text-[40px] md:text-[100px] leading-[107%] tracking-normal antialiased">
                            <div>It started with a blinking cursor <span className="text-orange cursor-blink"> / {' '}</span></div>
                        </h1>

                        <div>
                            <h2 className="font-bold font-jersey text-lg uppercase text-[32px]">
                                A BLANK FILE … A FEW KEYSTROKES
                            </h2>
                            <code className="block mt-1 p-2 bg-[#47100C] text-[#F47238] font-mono inline-block">
                                print("hello, world")
                            </code>
                        </div>

                        <p className="text-base md:text-lg leading-relaxed font-light">
                            You ran it – and the computer responded. <br />
                            You told a machine what to do – and it listened. <br />
                            That moment has sparked millions of journeys… <br />
                            Kids in bedrooms. Students in labs. Curious minds in internet cafés. <br />
                            A generation – and then another – learned the magic of software.
                        </p>

                        <p className="text-base md:text-lg leading-relaxed font-light">
                            They stayed up too late. <br />
                            They built games. Tools. Mods. Scripts to make life easier. <br />
                            They shared zip files on forums. Burned CDs for friends. <br />
                            They made things. 
                            <strong>Because they could!</strong>
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-xl font-bold font-jersey uppercase text-[32px]">
                            But the software we built changed
                        </h2>

                        <p className="text-base md:text-lg leading-relaxed font-light">
                            Small tools made by small teams gave way to big tools and big teams. <br />
                            Suddenly, we have massive platforms backed by massive money. <br />
                            We got jobs. We went to stand ups. We joined sprint planning calls and added tickets to Jira. 
                            Software became a business. <br />
                            <strong>And business became the reason software existed.</strong>
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-xl font-bold font-jersey uppercase text-[32px]">
                            There's nothing inherently wrong with software at scale
                        </h2>

                        <p className="text-base md:text-lg leading-relaxed font-light">
                            Enterprise software pays the bills. It keeps the lights on. <br />
                            But something got lost along the way. That magic. That feeling. <br />
                            That spark. <strong>That joy of creation.</strong>
                        </p>
                    </section>
                    <section className="space-y-6">
                        <h1 className="font-jersey-charted text-[40px] md:text-[100px] leading-[107%] tracking-normal antialiased">
                            <div>What if it could be different <span className="text-orange">?</span></div>
                        </h1>
                        <p className="text-base md:text-lg leading-relaxed font-light">
                            What if you could build a tool just for you - because you needed it?<br />
                            What if it didn't require five services and a Terraform config?<br />
                            What if you didn't need to be "professional developer" to make it happen?<br />
                            What if writing software was like picking up a power drill - a tool to get something done?<br />
                            Not a startup. Not a business. Not a side hustle. <br />
                            Just a piece of software that works. <br />
                            That's yours. That you own. That you can share (if you want to).
                        </p>

                        <h3 className="text-xl font-bold font-jersey uppercase text-[32px]">
                            Personal software is coming back
                        </h3>

                        <p className="text-base md:text-lg leading-relaxed font-light">
                            AI is lowering the barrier to entry. Serverless hosting is erasing the friction.  Frameworks like Redwood are simplifying the plumbing. You don't need to ask permission anymore. You don't need to scale. You don't need to monetize.
                            You just need a reason. An itch to scratch. A thing to build.
                            <strong>It's a personal software revolution. And it's coming.</strong>
                        </p>

                        <h3 className="text-xl font-bold font-jersey uppercase text-[32px]">
                            Redwood is here for that reason
                        </h3>

                        <p className="text-base md:text-lg leading-relaxed font-light">
                            We started Redwood to help developers build faster.
                            To reduce friction. To accelerate creation. Now, we're going further.
                            We want to be the framework - and the movement - behind personal software.  Software you can build, own, share, and modify (like it used to be).
                            Software that solves your problem. Software that doesn't try to lock you in or track your usage or upsell you into a higher tier.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed font-light">
                            <strong>Because here's the thing:</strong> The joy of writing software, and the joy of using it - they should go hand in hand. <strong>We want to bring that joy back.</strong> 
                        </p>

                        <h3 className="text-xl font-bold font-jersey uppercase text-[32px]">
                            The Personal Software Revolution
                        </h3>

                        <p className="text-base md:text-lg leading-relaxed font-light">
                            We believe software can be personal again. Not just technically, but philosophically. Owned. Forkable. Shareable. Local. Beautiful. Built for use, not for scale. Built with love, not venture funding. Built for yourself - and maybe a few others. If this resonates with you, come join us. We're not just building a framework. <strong>We're building a future where software is yours again.</strong>
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
}