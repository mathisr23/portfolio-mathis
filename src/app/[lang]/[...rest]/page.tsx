import { notFound } from "next/navigation";

// Overrides the layout's dynamicParams = false so unknown paths reach this route
// and render [lang]/not-found.tsx inside the locale layout
export const dynamicParams = true;

export default function CatchAll() {
    notFound();
}
