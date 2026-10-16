/**
 * The reel frame and the case study cover morph into each other by sharing a
 * view-transition-name. The cover always carries it; a reel frame only gets it when
 * clicked. Next keeps previous pages mounted (hidden) for instant back navigation, so
 * names declared ahead of time would collide; hidden elements are never captured.
 */
export const FRAME_NAME = "project-frame";

export function markFrame(el: HTMLElement | null) {
    if (!el) return;
    document.querySelectorAll<HTMLElement>("[data-vt-frame]").forEach((other) => {
        other.style.viewTransitionName = "";
        delete other.dataset.vtFrame;
    });
    el.style.viewTransitionName = FRAME_NAME;
    el.dataset.vtFrame = "";
}
