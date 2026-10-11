export type Language = "en" | "fr";
export type Localized = Record<Language, string>;

export type ProjectKind = "concept" | "client" | "experiment";

export interface FeaturedProject {
    slug: string;
    title: string;
    kind: ProjectKind;
    year: string;
    stack: string[];
    cover: string;
    gallery: string[];
    links: { live?: string; source?: string };
    tagline: Localized;
    role: Localized;
    overview: Localized;
    highlights: { title: Localized; body: Localized }[];
}

export interface LabProject {
    title: string;
    stack: string[];
    image: string;
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
        cover: "/work/aetherius-cover.webp",
        gallery: [],
        links: { source: "https://github.com/mathisr23/aetherius" },
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
        cover: "/work/nocturne-cover.webp",
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
        cover: "/work/museum500-cover.webp",
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
                title: { en: "Outside the React comfort zone", fr: "Hors de la zone de confort React" },
                body: {
                    en: "Built with Angular, Three.js and GSAP to learn a different framework on a project worth finishing.",
                    fr: "Construit avec Angular, Three.js et GSAP pour apprendre un autre framework sur un projet qui valait d'être terminé.",
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
        cover: "/work/atelierlvy-cover.webp",
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
        stack: ["Vite", "Three.js"],
        image: "/work/rng-reliques-cover.webp",
        link: "https://rng-reliques.vercel.app/",
        description: {
            en: "A luck-based collecting game in 3D: roll dice, reveal relics across 8 rarity tiers, build an idle economy. Played by friends.",
            fr: "Un jeu de collection basé sur la chance en 3D : lancez les dés, révélez des reliques sur 8 raretés, bâtissez une économie idle. Testé par des amis.",
        },
    },
    {
        title: "Still Looking",
        stack: ["Next.js", "GSAP"],
        image: "/work/still-looking-cover.webp",
        link: "https://still-looking.vercel.app/",
        description: {
            en: "My chronicle of the first-job search, a personal look at what junior developers go through today.",
            fr: "Ma chronique de la recherche d'un premier emploi, un regard personnel sur ce que vivent les développeurs juniors aujourd'hui.",
        },
    },
    {
        title: "PokéGacha",
        stack: ["React", "Vite"],
        image: "/work/pokegacha-cover.webp",
        link: "https://poke-gacha-ui.vercel.app/",
        description: {
            en: "A Pokémon gacha game where you collect and discover random Pokémon.",
            fr: "Un jeu gacha Pokémon où vous collectionnez et découvrez des Pokémon aléatoires.",
        },
    },
    {
        title: "UnemployedCountup",
        stack: ["HTML", "CSS", "JavaScript"],
        image: "/work/unemployed-countup-cover.webp",
        link: "https://unemployed-countup.vercel.app/",
        description: {
            en: "A satirical timer counting the seconds since unemployment, made with dark humour.",
            fr: "Un timer satirique comptant les secondes de chômage, avec un humour noir assumé.",
        },
    },
];

export function getFeaturedProject(slug: string) {
    return featuredProjects.find((p) => p.slug === slug);
}
