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
            className={`py-12 px-4 sm:px-8 max-w-[900px] mx-auto ${className}`}
        >
            {children}
        </section>
    );
}
