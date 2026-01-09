"use client";

interface NavItemProps {
    label: string;
    index: number;
}

export default function NavItem({ label, index }: NavItemProps) {
    // Generate proper href for each nav item
    const getHref = () => {
        const lowerLabel = label.toLowerCase();
        switch (lowerLabel) {
            case "about":
                return "/about";
            case "work":
                return "/";
            case "contact":
                return "/contact";
            default:
                return `/#${lowerLabel}`;
        }
    };

    return (
        <a
            href={getHref()}
            className="relative px-8 py-2 rounded-full overflow-hidden group hoverable"
        >
            {/* Text hover animation container */}
            <span className="text-hover-container block">
                <span className="text-hover-item text-hover-item-top text-sm font-medium tracking-wide text-white/80">
                    {label}
                </span>
                <span className="text-hover-item text-hover-item-bottom text-sm font-medium tracking-wide text-white">
                    {label}
                </span>
            </span>
        </a>
    );
}
