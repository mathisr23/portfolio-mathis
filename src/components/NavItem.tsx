"use client";

import { usePathname } from "next/navigation";

interface NavItemProps {
    label: string;
    index: number;
}

export default function NavItem({ label, index }: NavItemProps) {
    const pathname = usePathname();

    const getHref = () => {
        const lowerLabel = label.toLowerCase();
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

    const href = getHref();
    const isActive = (href === "/about" || href === "/contact") && pathname === href;

    return (
        <a
            href={href}
            aria-current={isActive ? "page" : undefined}
            className="relative px-4 py-2 group hoverable block"
        >
            <span
                className="text-hover-container block uppercase"
                style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.13em",
                    fontWeight: 600,
                }}
            >
                <span
                    className="text-hover-item text-hover-item-top"
                    style={{
                        color: isActive
                            ? "rgba(139, 92, 246, 0.9)"
                            : "rgba(255,255,255,0.45)",
                    }}
                >
                    {label}
                </span>
                <span
                    className="text-hover-item text-hover-item-bottom"
                    style={{
                        color: isActive
                            ? "rgba(139, 92, 246, 1)"
                            : "rgba(255,255,255,1)",
                    }}
                >
                    {label}
                </span>
            </span>

            {/* Active dot indicator */}
            {isActive && (
                <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "rgba(139, 92, 246, 0.7)" }}
                    aria-hidden="true"
                />
            )}
        </a>
    );
}
