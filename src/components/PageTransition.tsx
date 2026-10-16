"use client";

import { ViewTransition } from "react";

/**
 * Lets React run route changes inside a view transition. The page itself cross-fades;
 * elements with their own view-transition-name (nav, project frame) animate separately.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
    return <ViewTransition>{children}</ViewTransition>;
}
