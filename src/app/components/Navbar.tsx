"use client"
import * as React from 'react'
import { CloudflareImage } from './CloudflareImage';
import Constants from 'src/lib/Constants';
import { GitHubStarWidget } from './GitHubStarWidget';

interface NavbarProps {
    activePage?: string;
}

export function Navbar(props: NavbarProps) {
    const [hasShadow, setHasShadow] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setHasShadow(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`flex flex-col sm:flex-row justify-between sticky top-0 bg-baige z-99 items-center py-4 px-4 sm:px-8 transition-shadow duration-200 ${hasShadow ? 'shadow-md' : ''}`}>
            <CloudflareImage
                imageId="37162c6c-890c-48e3-790a-48b2b87fcd00"
                alt="logo"
                className="w-[140px] sm:w-[186px]"
            />
            <div className="flex gap-2 sm:gap-4 font-jersey text-[16px] sm:text-[20px] mt-4 sm:mt-0">
                <a href="/blog" className={`hover:text-orange-medium transition-colors ${props.activePage === "blog" ? "text-orange-medium" : ""}`}>Blog</a>
                <span className="text-orange-light">/</span>
                <a href="/personal-software" className={`hover:text-orange-medium transition-colors ${props.activePage === "personal-software" ? "text-orange-medium" : ""}`}>Personal Software</a>
                <span className="text-orange-light">/</span>
                <a href={Constants.DOCS_URL} className="hover:text-orange-medium transition-colors">Docs</a>
                <span className="text-orange-light">/</span>
                <a href={Constants.DISCORD_URL} className="hover:text-orange-medium transition-colors">Discord</a>
                <span className="text-orange-light">/</span>
                <GitHubStarWidget />
            </div>
        </div>
    );
} 