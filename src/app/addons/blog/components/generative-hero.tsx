// Static hero image component — serves pre-generated pixel art from public/blog-heroes/

interface GenerativeHeroProps {
    slug: string;
    title: string;
}

export default function GenerativeHero({ slug, title }: GenerativeHeroProps) {
    return (
        <div
            className="w-full mb-8 rounded-xl overflow-hidden"
            role="img"
            aria-label={`Hero image for: ${title}`}
        >
            <img
                src={`/blog-heroes/${slug}.png`}
                alt={title}
                className="w-full h-auto block object-cover"
                style={{ maxHeight: "280px", imageRendering: "pixelated" }}
                loading="eager"
            />
        </div>
    );
}
