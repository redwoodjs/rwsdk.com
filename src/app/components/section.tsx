import { ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
    return (
        <section
            id={id}
            className={`px-4 sm:px-8 max-w-[800px] mx-auto ${className} mb-16`}
        >
            {children}
        </section>
    );
}
