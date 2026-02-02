"use client";

interface NavItemProps {
    label: string;
    index: number;
}

export default function NavItem({ label, index }: NavItemProps) {
    // Generate proper href for each nav item
    const getHref = () => {
        const lowerLabel = label.toLowerCase();

        // Map both English and French labels to their routes
        const routeMap: Record<string, string> = {
            "work": "/#work",
            "projets": "/#work",
            "travaux": "/#work",
            "about": "/about",
            "à propos": "/about",
            "contact": "/contact",
        };

        return routeMap[lowerLabel] || `/#${lowerLabel}`;
    };

    return (
        <a
            href={getHref()}
            className="relative px-3 sm:px-6 py-2 rounded-full overflow-hidden group hoverable"
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
