import type { Language } from "@/lib/i18n";

export type { Language };
export type Localized = Record<Language, string>;

export type ProjectKind = "concept" | "client" | "experiment";

export interface FeaturedProject {
    slug: string;
    title: string;
    kind: ProjectKind;
    year: string;
    stack: string[];
    cover: string;
    /** Base path of a muted loop: <video>.mp4, <video>.webm (cover is its first frame) */
    video?: string;
    gallery: string[];
    links: { live?: string; source?: string };
    tagline: Localized;
    role: Localized;
    overview: Localized;
    highlights: { title: Localized; body: Localized }[];
    /** The hardest problem, told plainly */
    challenge?: Challenge;
}

export interface Challenge {
    title: Localized;
    paragraphs: Localized[];
    /** A short excerpt, simplified from the project's source */
    code?: { snippet: string; caption: Localized };
    /** What is still unfinished, or what I would do differently */
    next?: Localized;
}

export interface LabProject {
    title: string;
    /** What it is, in a word or two */
    label: Localized;
    stack: string[];
    image: string;
    video?: string;
    link: string;
    description: Localized;
}

export const featuredProjects: FeaturedProject[] = [
    {
        slug: "aetherius",
        title: "Aetherius",
        kind: "concept",
        year: "2026",
        stack: ["React", "TypeScript", "Three.js", "GSAP", "Lenis"],
        cover: "/work/video/aetherius-poster.webp",
        video: "/work/video/aetherius",
        gallery: [],
        links: { live: "https://aetherius-exp.vercel.app/", source: "https://github.com/mathisr23/aetherius" },
        tagline: {
            en: "A monochrome, scroll-driven showreel for a fictional immersive production house.",
            fr: "Un showreel monochrome piloté au scroll pour une maison de production immersive fictive.",
        },
        role: {
            en: "Concept, design & development",
            fr: "Concept, design & développement",
        },
        overview: {
            en: "Inspired by the ink-silhouette edits that circulate on TikTok, Aetherius is a single continuous shot: one camera travels a corridor of fog, and every section of the site is a station along the way. Scroll drives the camera, a collision sequence and a tracking shot through the studio's disciplines, with a soundtrack and a voiceover for each chapter.",
            fr: "Inspiré des edits en silhouettes à l'encre qui circulent sur TikTok, Aetherius est un plan-séquence : une caméra traverse un couloir de brume, et chaque section du site est une station sur le trajet. Le scroll pilote la caméra, une séquence de collision et un travelling à travers les disciplines du studio, avec une bande-son et une voix off pour chaque chapitre.",
        },
        challenge: {
            title: { en: "Keeping camera, content and voice in sync", fr: "Synchroniser caméra, contenu et voix" },
            paragraphs: [
                {
                    en: "The hardest part was alignment. The camera moves with the scroll, the text lives in the page, and a narrator names each section as you enter it. Early on they drifted apart: the camera arrived before the text, or the voice started while you were still scrolling past.",
                    fr: "Le plus dur, c'était l'alignement. La caméra avance avec le scroll, le texte vit dans la page, et une voix annonce chaque section quand on y entre. Au début, tout se décalait : la caméra arrivait avant le texte, ou la voix partait alors qu'on était encore en train de défiler.",
                },
                {
                    en: "The fix was to stop driving the camera by scroll percentage. Each section declares a station on the camera path; the page measures where those sections actually sit and maps the scroll between them, so the camera follows the layout instead of guessing it. Some sections hold the camera still while you read, and everything is measured again once the fonts load and on resize. The narrator waits until you have settled in a section before speaking, and the music steps back while she does.",
                    fr: "La solution : arrêter de piloter la caméra au pourcentage de scroll. Chaque section déclare une station sur le trajet de la caméra ; la page mesure où ces sections se trouvent réellement et répartit le scroll entre elles, si bien que la caméra suit la mise en page au lieu de la deviner. Certaines sections figent la caméra le temps de la lecture, et tout est remesuré au chargement des polices et au redimensionnement. La voix attend que l'on soit posé dans une section pour parler, et la musique s'efface pendant ce temps.",
                },
            ],
            code: {
                caption: { en: "Simplified from the Aetherius source.", fr: "Simplifié depuis le code d'Aetherius." },
                snippet: `// Each section is a station on the camera path.
// Measure where it really is, then map the scroll between stations.
const anchors = sections.flatMap((el) => {
  const top = el.getBoundingClientRect().top + scrollY;
  const station = Number(el.dataset.station);
  const span = Math.max(0, el.offsetHeight - innerHeight);
  return el.dataset.anchor === "hold"
    ? [{ y: top, station }, { y: top + span, station }] // camera holds while you read
    : [{ y: top + span / 2, station }];
});

// The narrator speaks once you have settled, never while flying past.
const id = setTimeout(() => sound.say(VOICE[chapter]), 650);`,
            },
            next: {
                en: "The 3D is not where I want it yet, and I'm still working on it.",
                fr: "La 3D n'est pas encore là où je la veux, et je continue de la travailler.",
            },
        },
        highlights: [
            {
                title: { en: "One camera, one corridor", fr: "Une caméra, un couloir" },
                body: {
                    en: "The whole site is a single Three.js scene. GSAP ScrollTrigger and Lenis map scroll position to the camera path, so navigation feels like a film rather than a page.",
                    fr: "Tout le site est une seule scène Three.js. GSAP ScrollTrigger et Lenis relient le scroll au trajet de la caméra : la navigation ressemble à un film plutôt qu'à une page.",
                },
            },
            {
                title: { en: "Procedural figures", fr: "Silhouettes procédurales" },
                body: {
                    en: "No imported models. Every body is built in code from lofted elliptical rings, articulated, then baked into crowds.",
                    fr: "Aucun modèle importé. Chaque corps est construit en code à partir d'anneaux elliptiques extrudés, articulé, puis dupliqué en foules.",
                },
            },
            {
                title: { en: "The depth-map look", fr: "L'esthétique depth-map" },
                body: {
                    en: "Linear depth fog on ink silhouettes, volumetric light, fog sheets, dust and film grain. Kinetic headlines slice apart around a sword cursor that slashes on click.",
                    fr: "Brouillard de profondeur sur des silhouettes à l'encre, lumière volumétrique, nappes de brume, poussière et grain. Des titres cinétiques se fendent autour d'un curseur-épée qui tranche au clic.",
                },
            },
        ],
    },
    {
        slug: "nocturne",
        title: "Nocturne",
        kind: "concept",
        year: "2026",
        stack: ["Vite", "Three.js", "Lenis"],
        cover: "/work/video/nocturne-poster.webp",
        video: "/work/video/nocturne",
        gallery: [],
        links: { live: "https://nocturne-landing-teal.vercel.app/" },
        tagline: {
            en: "Landing page concept for a fictional edge-compute platform: liquid infrastructure, taken literally.",
            fr: "Concept de landing page pour une plateforme d'edge computing fictive : l'infrastructure liquide, au sens propre.",
        },
        role: {
            en: "Concept, design & development",
            fr: "Concept, design & développement",
        },
        overview: {
            en: "Nocturne was an excuse to try something new: take a brand promise, \"compute that takes the shape of your workload\", and turn it into an object. A chrome form morphs and drifts through the page as you scroll, carrying the story from hero to pricing.",
            fr: "Nocturne était un prétexte pour essayer quelque chose de nouveau : prendre une promesse de marque, « du compute qui prend la forme de votre charge », et en faire un objet. Une forme chromée se déforme et voyage à travers la page au fil du scroll, du hero jusqu'aux tarifs.",
        },
        challenge: {
            title: { en: "Heavy images on a scroll-driven page", fr: "Des images lourdes sur une page pilotée au scroll" },
            paragraphs: [
                {
                    en: "Nocturne was me trying something new, and most of it went smoothly. The one recurring problem was weight: the large images were heavy, and sometimes didn't appear in time while scrolling, leaving a gap where the next scene should have been.",
                    fr: "Nocturne, c'était moi qui essayais quelque chose de nouveau, et la plupart du temps tout s'est bien passé. Le seul problème récurrent, c'était le poids : les grandes images étaient lourdes, et n'apparaissaient parfois pas à temps pendant le scroll, laissant un vide là où la scène suivante aurait dû être.",
                },
            ],
            next: {
                en: "Next time I'd treat images as part of the performance budget from day one: compressed, sized for the screen, and loaded before the scroll reaches them.",
                fr: "La prochaine fois, je traiterai les images comme une partie du budget de performance dès le premier jour : compressées, dimensionnées pour l'écran, et chargées avant que le scroll ne les atteigne.",
            },
        },
        highlights: [
            {
                title: { en: "Liquid chrome in WebGL", fr: "Du chrome liquide en WebGL" },
                body: {
                    en: "A reflective, morphing mesh rendered with Three.js that follows the scroll between sections instead of staying in the hero.",
                    fr: "Un mesh réfléchissant et déformable rendu avec Three.js, qui suit le scroll d'une section à l'autre au lieu de rester dans le hero.",
                },
            },
            {
                title: { en: "Typography as transition", fr: "La typographie comme transition" },
                body: {
                    en: "Oversized type carries the rhythm: marquee bands, outlined words, and the wordmark split across a full-bleed image.",
                    fr: "La typographie surdimensionnée donne le rythme : bandeaux défilants, mots en contour, et le logo éclaté sur une image plein cadre.",
                },
            },
            {
                title: { en: "A believable fake brand", fr: "Une fausse marque crédible" },
                body: {
                    en: "Live region counters, latency readouts and a deploy terminal make the product feel real without a single line of backend.",
                    fr: "Compteurs de régions, latences et terminal de déploiement rendent le produit crédible sans une ligne de backend.",
                },
            },
        ],
    },
    {
        slug: "museum-of-500",
        title: "Museum of 500",
        kind: "experiment",
        year: "2026",
        stack: ["Angular", "Three.js", "GSAP"],
        cover: "/work/video/museum-of-500-poster.webp",
        video: "/work/video/museum-of-500",
        gallery: [],
        links: { live: "https://museum500.vercel.app/" },
        tagline: {
            en: "An interactive museum of five software failures that became legend, from Therac-25 to CrowdStrike.",
            fr: "Un musée interactif de cinq pannes logicielles devenues légendaires, du Therac-25 à CrowdStrike.",
        },
        role: {
            en: "Concept, design & development",
            fr: "Concept, design & développement",
        },
        overview: {
            en: "Every developer has a favourite production horror story. Museum of 500 turns five of the most famous into rooms you walk through: a race condition in a radiotherapy machine, a forgotten flag that sank a trading firm, an rm -rf on the wrong server, 47 characters of regex, and an empty config file that grounded 8.5 million machines.",
            fr: "Chaque développeur a sa histoire d'horreur en production préférée. Museum of 500 transforme cinq des plus célèbres en salles à visiter : une race condition dans un appareil de radiothérapie, un flag oublié qui a coulé une firme de trading, un rm -rf sur le mauvais serveur, 47 caractères de regex, et un fichier de config vide qui a cloué 8,5 millions de machines au sol.",
        },
        highlights: [
            {
                title: { en: "Five rooms, five incidents", fr: "Cinq salles, cinq incidents" },
                body: {
                    en: "Therac-25 (1985), Knight Capital (2012), GitLab (2017), Cloudflare (2019) and CrowdStrike (2024), each told as its own exhibit.",
                    fr: "Therac-25 (1985), Knight Capital (2012), GitLab (2017), Cloudflare (2019) et CrowdStrike (2024), chacun raconté comme une exposition.",
                },
            },
            {
                title: { en: "An aesthetic of failure", fr: "Une esthétique de la panne" },
                body: {
                    en: "Editorial serif type against a terminal HUD: a live error counter, kernel-panic tickers and cursor coordinates that follow you around.",
                    fr: "Une serif éditoriale face à une interface de terminal : compteur d'erreurs en direct, bandeaux kernel panic et coordonnées qui suivent le curseur.",
                },
            },
            {
                title: { en: "Angular meets WebGL", fr: "Angular rencontre WebGL" },
                body: {
                    en: "Built with Angular, the framework I used for two years at Thales, paired with Three.js and GSAP for the 3D and the motion.",
                    fr: "Construit avec Angular, le framework que j'ai utilisé pendant deux ans chez Thales, associé à Three.js et GSAP pour la 3D et le motion.",
                },
            },
        ],
    },
    {
        slug: "atelier-lvy",
        title: "Atelier Lvy",
        kind: "client",
        year: "2026",
        stack: ["Next.js", "TypeScript", "Tailwind"],
        cover: "/work/video/atelier-lvy-poster.webp",
        video: "/work/video/atelier-lvy",
        gallery: [],
        links: { live: "https://www.atelierlvy.com/" },
        tagline: {
            en: "Website for Léa, a ceramic artist: her work, her shop, and her pottery classes.",
            fr: "Le site de Léa, artiste céramiste : ses créations, sa boutique et ses cours de poterie.",
        },
        role: {
            en: "Front-end development",
            fr: "Développement front-end",
        },
        overview: {
            en: "A real client with a real business: Léa needed a site that feels as handmade as her ceramics, and that turns visitors into students for her initiation workshops and classes.",
            fr: "Une vraie cliente avec une vraie activité : Léa avait besoin d'un site aussi artisanal que ses céramiques, qui transforme les visiteurs en élèves pour ses initiations et ses cours.",
        },
        challenge: {
            title: { en: "Building for a real client", fr: "Travailler pour une vraie cliente" },
            paragraphs: [
                {
                    en: "The challenge wasn't one technical problem, it was the back-and-forth. Every request from Léa meant a change, and every change could bring a bug that neither of us noticed, until someone trying to book a workshop ran into it.",
                    fr: "Le défi n'était pas un problème technique, c'était l'aller-retour. Chaque demande de Léa impliquait un changement, et chaque changement pouvait amener un bug que ni elle ni moi ne voyions, jusqu'à ce qu'une personne essayant de réserver un atelier tombe dessus.",
                },
            ],
            next: {
                en: "It changed what \"done\" means to me: a feature is finished when the people using the site can't break it, not when it works on my screen.",
                fr: "Ça a changé ma définition de « terminé » : une fonctionnalité est finie quand les personnes qui utilisent le site ne peuvent plus la casser, pas quand elle marche sur mon écran.",
            },
        },
        highlights: [
            {
                title: { en: "Handmade on screen", fr: "De l'artisanal à l'écran" },
                body: {
                    en: "Hand-drawn illustrations, organic colour shapes and a warm italic serif carry the identity of the studio.",
                    fr: "Illustrations dessinées à la main, formes colorées organiques et serif italique chaleureuse portent l'identité de l'atelier.",
                },
            },
            {
                title: { en: "Built around booking", fr: "Pensé pour la réservation" },
                body: {
                    en: "Shop, initiation and classes are one click from anywhere, with the workshop call to action right in the hero.",
                    fr: "Boutique, initiation et cours sont à un clic partout, avec l'appel à l'initiation directement dans le hero.",
                },
            },
            {
                title: { en: "Shipped and live", fr: "Livré et en ligne" },
                body: {
                    en: "In production on the client's own domain, built with Next.js, TypeScript and Tailwind.",
                    fr: "En production sur le domaine de la cliente, développé avec Next.js, TypeScript et Tailwind.",
                },
            },
        ],
    },
];

export const labProjects: LabProject[] = [
    {
        title: "RNG Reliques",
        label: { en: "Browser game", fr: "Jeu navigateur" },
        stack: ["Vite", "Three.js"],
        image: "/work/video/rng-reliques-poster.webp",
        video: "/work/video/rng-reliques",
        link: "https://rng-reliques.vercel.app/",
        description: {
            en: "A luck-based collecting game in 3D: roll dice, reveal relics across 8 rarity tiers, build an idle economy. Played by friends.",
            fr: "Un jeu de collection basé sur la chance en 3D : lancez les dés, révélez des reliques sur 8 raretés, bâtissez une économie idle. Testé par des amis.",
        },
    },
    {
        title: "Still Looking",
        label: { en: "Personal chronicle", fr: "Chronique personnelle" },
        stack: ["Next.js", "GSAP"],
        image: "/work/video/still-looking-poster.webp",
        video: "/work/video/still-looking",
        link: "https://still-looking.vercel.app/",
        description: {
            en: "My chronicle of the first-job search, a personal look at what junior developers go through today.",
            fr: "Ma chronique de la recherche d'un premier emploi, un regard personnel sur ce que vivent les développeurs juniors aujourd'hui.",
        },
    },
    {
        title: "Mnemosyne",
        label: { en: "Browser puzzle game", fr: "Jeu d'enquête navigateur" },
        stack: ["React", "TypeScript", "Web Audio"],
        image: "/work/video/mnemosyne-poster.webp",
        link: "https://mnemosyneui.vercel.app/",
        description: {
            en: "An almost empty page and forty locks. The dismantled workstation of a missing systems architect: every secret you find rebuilds a piece of the interface.",
            fr: "Une page presque vide et quarante serrures. Le poste démonté d'un architecte système disparu : chaque secret trouvé reconstruit un morceau de l'interface.",
        },
    },
];

export type ReelItem =
    | { type: "featured"; project: FeaturedProject }
    | { type: "lab"; project: LabProject };

// One sequence for the whole body of work, alternating weight so the reel keeps its rhythm
const reelOrder = [
    "Aetherius",
    "Nocturne",
    "RNG Reliques",
    "Museum of 500",
    "Atelier Lvy",
    "Still Looking",
    "Mnemosyne",
];

export const reel: ReelItem[] = reelOrder.map((title) => {
    const featured = featuredProjects.find((p) => p.title === title);
    if (featured) return { type: "featured", project: featured };
    const lab = labProjects.find((p) => p.title === title);
    if (!lab) throw new Error(`Unknown project in reel: ${title}`);
    return { type: "lab", project: lab };
});

export function getFeaturedProject(slug: string) {
    return featuredProjects.find((p) => p.slug === slug);
}
