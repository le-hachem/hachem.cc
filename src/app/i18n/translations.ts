export type Lang = "en" | "fr" | "de";

/**
 * Canonical category keys used throughout the composition data. These are
 * stable identifiers (kept in English) so filtering/grouping logic never
 * depends on the display language. Human-readable labels live in `t.categories`.
 */
export type CompositionCategory =
  | "Large Ensemble"
  | "Chamber Music"
  | "Piano Solo"
  | "Voice & Piano";

/* ------------------------------------------------------------------ */
/* English dictionary — also the canonical shape for every language.  */
/* ------------------------------------------------------------------ */

const en = {
  masthead: "Hachem — Composer's Record",
  language: {
    label: "Language",
    en: "English",
    fr: "Français",
    switchTo: "Passer en français",
  },

  nav: {
    about: "About",
    works: "Works",
    agenda: "Concerts",
    dispatches: "Dispatches",
    projects: "Projects",
    services: "Services",
    commissions: "Commissions",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    subtitle: "Composer · Pianist · Conductor",
    scroll: "Scroll",
  },

  front: {
    edition: "Late Edition",
    price: "Price: Free",
    place: "Paris · Beirut",
    inThisIssue: "In This Issue",
    theLead: "The Lead — Profile",
    continued: "Continued in No. 01 — Profile →",
    motto: "Composing the new, reviving the old.",
    leadPhoto: "Lead Photograph",
    cutline: "The instrument for which the cipher was written.",
  },
  about: {
    dept: "Profile",
    headline: "From Solfège to the Sorbonne",
    deck: "A self-taught Lebanese composer who abandoned physics to write the classical forms he learned from scores, not teachers.",
    byline: "By Our Music Correspondent",
    title: "Biography",
    timeline: "Timeline",
    recognition: "Recognition",
    /** Renders a milestone's age/year label. 4-digit values are shown as a bare year. */
    ageLabel: (age: string) => (/^\d{4}$/.test(age) ? age : `Age ${age}`),
    milestones: [
      "Began learning music.",
      "Started composing, writing melodies in solfège syllables before learning to read a stave.",
      "Turned to serious self-study: harmony, counterpoint, form. Writing canons, sonatas and fugues without formal instruction.",
      "Left Lebanon to pursue physics and mathematics, studying at university in France and then Belgium.",
      "Left academia to focus entirely on music. Now studying composition at the Sorbonne, Paris.",
    ],
    bio1: "PARIS — He was four when he began music and six when he began writing it, setting melodies down in solfège syllables because he had not yet learned to read a stave.",
    bio2: "By thirteen the lessons had hardened into a private discipline. He worked through harmony and counterpoint alone, filling notebooks with canons, sonatas and fugues; what he knows of the classical forms he took from the scores themselves, not from teachers.",
    bio3: "Born in Lebanon, he left at seventeen to study physics and mathematics, first in France and then Belgium, before giving up the sciences for music in 2026. He now studies composition at the Sorbonne in Paris.",
    bio5: "He never saw physics and music as opposites. Both start with hearing a structure before you can prove it works, and for years one fed the other, until he had to choose.",
    bio6: "His own music runs from solo lines to large ensemble and choral works. The hours he doesn't spend on it go into restoring other people's.",
    bio4Pre: "Alongside his own writing, he runs the ",
    bio4Project: "Lili Boulanger Restoration Project",
    bio4Post:
      ", preparing new editions of her manuscripts and publishing them freely on IMSLP.",
    accolades: [
      { title: "1st Place · Harmony & Orchestration", body: "ICS Composition Competition" },
      { title: "4th Place · Overall", body: "ICS Composition Competition" },
    ],
  },

  services: {
    lede: "Most of what comes across this desk is collaborative: a conductor with a programme to fill, an ensemble between commissions, a publisher with a manuscript that needs a clean edition. It's all practical, made-to-order work, built around the people who will perform it.",
    dept: "Notices",
    headline: "Composer Offers His Services",
    deck: "Commissions, engraving, orchestration and teaching, for performers and institutions.",
    byline: "Trade Notices",
    title: "Services",
    subtitle: "Working with performers & institutions",
    badgeOpen: "Open",
    badgeClosed: "Closed",
    items: [
      {
        title: "Commissions",
        body: "New works for soloists, chamber ensembles, choirs and orchestras, written in close dialogue with the performers who premiere them.",
      },
      {
        title: "Engraving & Editions",
        body: "Clean, faithful engravings of manuscripts and worn editions, from single parts to full critical scores, ready for publication.",
      },
      {
        title: "Orchestration & Arrangement",
        body: "Orchestration of keyboard and chamber works for larger forces, and idiomatic arrangements tailored to the ensemble at hand.",
      },
      {
        title: "Teaching",
        body: "Private lessons in piano, harmony, counterpoint and composition, adapted to each student.",
      },
    ],
    ctaPre: "Every project starts with a conversation, so ",
    ctaLink: "get in touch",
    ctaPost: ".",
  },

  commissions: {
    dept: "Notices · Commissions",
    headline: "Commissioning a New Work, Step by Step",
    deck: "From the first inquiry to engraved parts in the players' hands.",
    byline: "Commissions Desk",
    title: "Commissions",
    sealOpen: "Commissions open",
    sealClosed: "Commissions closed",
    ledeOpen:
      "I am currently taking on a limited number of commissions, from solo and chamber pieces to large ensemble and choral works. Slots are taken in order of premiere date.",
    ledeClosed:
      "The commission diary is full for the moment while current works are completed. Inquiries are still welcome! Write ahead and you'll be first in line when the diary reopens.",
    steps: [
      {
        title: "Inquiry",
        body: "Write with the essentials: the ensemble, the occasion, the desired duration and the premiere date.",
      },
      {
        title: "Conversation",
        body: "We discuss character, programme context and practical constraints, then agree on scope, fee and schedule.",
      },
      {
        title: "Sketch & Draft",
        body: "You receive a sketch early in the writing for feedback, before the full draft is completed.",
      },
      {
        title: "Score & Parts",
        body: "Delivery of the final engraved score and parts, with revisions through the first rehearsals.",
      },
    ],
    ctaOpen: "Inquire about a commission",
    ctaClosed: "Ask about future availability",
  },

  agenda: {
    dept: "Concert Diary",
    headline: "Where the Music Is Heard",
    deck: "Premieres and performances, past and upcoming.",
    byline: "Concert Diary",
    title: "Concerts",
    upcoming: "Upcoming",
    past: "Past",
    tickets: "Tickets",
    none: "No dates announced just now. Check back soon, or drop me a line and I'll tell you first.",
    pastHiddenKicker: "Under revision",
    pastHiddenLine1: "The archive of past dates is undergoing a change of architecture.",
    pastHiddenLine2: "Please bear with me while things are being reworked.",
    roles: {
      composer: "Composer",
      pianist: "Pianist",
      conductor: "Conductor",
      lecturer: "Lecturer",
    },
  },

  notFound: {
    kicker: "Error 404 — Off the Record",
    headline: "This edition could not be found.",
    deck: "The page you asked for isn't in our records. Maybe it was never printed, or the link has changed since.",
    back: "Return to the front page",
  },

  dispatches: {
    dept: "Dispatches",
    headline: "Notices from the Desk",
    deck: "Bulletins on premieres, prizes and new editions, as they happen.",
    byline: "Newsroom",
    readMore: "Read more",
    none: "No bulletins just yet.",
  },

  contact: {
    dept: "Correspondence",
    headline: "Write to the Composer",
    deck: "Open to performers, ensembles, institutions, and the merely curious.",
    byline: "From the Editor's Desk",
    title: "Contact",
    eyebrow: "A note from the composer",
    salutation: "Dear reader,",
    p1: "I'm always glad to hear from performers, ensembles and institutions looking for new work, whether that's an original score or bringing back music that's been forgotten.",
    p2: "I also take in engraving, orchestration and arrangement, and I teach piano and composition.",
    p3: "If any of that might be useful to you, write to me directly:",
    p4: "And if you simply like what I do and would like to help it along, you can stand me a coffee:",
    kofi: "Support on Ko-fi",
    closing: "Warmly,",
  },

  book: {
    dept: "Restoration",
    headline: "A Forgotten Prix de Rome, Restored to the Page",
    deck: "A project re-engraves Lili Boulanger's neglected manuscripts and returns them, free, to performers everywhere.",
    byline: "Special Report",
    titleTop: "The Lili Boulanger",
    titleSub: "Restoration Project",
    p1: "Lili Boulanger (1893–1918) was the first woman to win the Prix de Rome, and yet a century on much of her music still has no proper modern edition, and some of it was never formally published at all. Her manuscripts lie scattered across archives, waiting to be heard as she intended.",
    p2: "This project sets out to change that. Each work is re-engraved from her own manuscripts and sketches, faithful to her notation and cleared of the errors that crept in over a hundred years of copying, so that a performer anywhere can simply open the score and play.",
    p3: "The work is ongoing. The library grows with every edition completed, and each one is published, free, on IMSLP.",
    p4: "Each finished edition joins a growing catalogue, free to download and to perform; the aim is simply that her music circulate again.",
    viewCatalogue: "View her complete catalogue",
    portraitCaption: "First woman to win the Prix de Rome",
  },

  rack: {
    review: "The pieces here range from solo lines to large ensemble and choral writing, each added to the catalogue as it's finished. This is a selection; the full list is longer.",
    dept: "The Arts · Review",
    headline: "Composer Unveils a Season of New Works",
    deck: "Selected compositions for soloists, chamber groups, choir and orchestra.",
    byline: "Catalogue Desk",
    title: "Featured Works",
    subtitle: "Selected Compositions",
    allCompositions: "All Compositions",
    awarded: "Awarded",
    listen: "Listen",
    instrumentation: "Instrumentation",
    open: "Open →",
    maintenanceKicker: "Under revision",
    maintenanceLine1: "This section is undergoing a change of architecture.",
    maintenanceLine2: "Please bear with me while things are being reworked.",
  },

  modal: {
    recognition: "Recognition",
    about: "About this work",
    influences: "Influences",
    instrumentation: "Instrumentation",
    close: "Close",
    clickOutside: "Click outside to close",
  },

  library: {
    title: "Catalogue of Works",
    /** e.g. "Hachem · 7 compositions" */
    countLine: (n: number) => `Hachem · ${n} compositions`,
    byInstrumentation: "By Instrumentation",
    allWorks: "All Works",
    all: "All",
    workCount: (n: number) => `${n} ${n === 1 ? "work" : "works"}`,
    footer: "Click any work to view the full score and details",
  },

  categories: {
    labels: {
      "Large Ensemble": "Large Ensemble",
      "Chamber Music": "Chamber Music",
      "Piano Solo": "Piano Solo",
      "Voice & Piano": "Voice & Piano",
    } as Record<CompositionCategory, string>,
    descriptions: {
      "Large Ensemble": "Orchestra, chorus, and large forces",
      "Chamber Music": "Small instrumental combinations",
      "Piano Solo": "Works for piano alone",
      "Voice & Piano": "Songs and mélodies",
    } as Record<CompositionCategory, string>,
  },

  lili: {
    name: "Lili Boulanger",
    /** e.g. "1893 – 1918 · 25 works · 2 restored editions" */
    headerLine: (works: number, editions: number) =>
      `1893 – 1918 · ${works} works · ${editions} restored editions`,
    byInstrumentation: "By Instrumentation",
    allWorks: "All Works",
    all: "All",
    workCount: (n: number) => `${n} ${n === 1 ? "work" : "works"}`,
    edition: "Edition",
    footer: "More editions are on the way.",
    categoryLabels: {
      All: "All Works",
      Piano: "Piano",
      Chamber: "Chamber",
      Voice: "Voice",
      Choral: "Choral",
    } as Record<string, string>,
    categoryDescriptions: {
      All: "Complete catalogue",
      Piano: "Solo piano works",
      Chamber: "Chamber & instrumental",
      Voice: "Songs for voice",
      Choral: "Choral & orchestral",
    } as Record<string, string>,
  },

  audio: {
    play: "Play",
    pause: "Pause",
    seek: "Seek",
    mute: "Mute",
    unmute: "Unmute",
  },

  footer: {
    fine: "𝄂    fine.",
  },

  seo: {
    title: "Hachem — Composer's Record",
    description:
      "Composer, pianist, and conductor in Paris, studying at the Sorbonne, creating new works from solo piano to orchestra, publishing free Lili Boulanger editions on IMSLP, and accepting commissions.",
  },
};

/** The dictionary shape every language must satisfy. */
export type Dict = typeof en;

/* ------------------------------------------------------------------ */
/* French dictionary.                                                  */
/* ------------------------------------------------------------------ */

const fr: Dict = {
  masthead: "Hachem — Journal du compositeur",
  language: {
    label: "Langue",
    en: "English",
    fr: "Français",
    switchTo: "Switch to English",
  },

  nav: {
    about: "Biographie",
    works: "Œuvres",
    agenda: "Concerts",
    dispatches: "Dépêches",
    projects: "Projets",
    services: "Services",
    commissions: "Commandes",
    contact: "Contact",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },

  hero: {
    subtitle: "Compositeur · Pianiste · Chef d'orchestre",
    scroll: "Défiler",
  },

  front: {
    edition: "Édition tardive",
    price: "Prix : gratuit",
    place: "Paris · Beyrouth",
    inThisIssue: "Au sommaire",
    theLead: "À la une — Portrait",
    continued: "Suite au No. 01 — Portrait →",
    motto: "Composer du neuf, faire revivre l'ancien.",
    leadPhoto: "Photographie à la une",
    cutline: "L'instrument pour lequel le chiffre a été écrit.",
  },
  about: {
    dept: "Portrait",
    headline: "Du solfège à la Sorbonne",
    deck: "Compositeur libanais autodidacte, il a quitté la physique pour écrire les formes classiques apprises dans les partitions, non auprès des maîtres.",
    byline: "Par notre correspondant musical",
    title: "Biographie",
    timeline: "Parcours",
    recognition: "Distinctions",
    ageLabel: (age: string) => (/^\d{4}$/.test(age) ? age : `${age} ans`),
    milestones: [
      "Débute l'apprentissage de la musique.",
      "Premières compositions : des mélodies écrites en syllabes de solfège, avant même de savoir lire une portée.",
      "Se tourne vers un apprentissage autodidacte rigoureux : harmonie, contrepoint, forme. Écrit canons, sonates et fugues sans enseignement formel.",
      "Quitte le Liban pour étudier la physique et les mathématiques à l'université, en France puis en Belgique.",
      "Quitte le monde universitaire pour se consacrer entièrement à la musique. Étudie aujourd'hui la composition à la Sorbonne, à Paris.",
    ],
    bio1: "PARIS — Il avait quatre ans lorsqu'il a commencé la musique, six lorsqu'il s'est mis à en écrire, notant ses mélodies en syllabes de solfège faute de savoir encore lire une portée.",
    bio2: "À treize ans, les leçons s'étaient muées en discipline solitaire. Il a travaillé seul l'harmonie et le contrepoint, noircissant des cahiers de canons, de sonates et de fugues ; ce qu'il sait des formes classiques, il l'a tiré des partitions elles-mêmes, non de maîtres.",
    bio3: "Né au Liban, il le quitte à dix-sept ans pour étudier la physique et les mathématiques, en France puis en Belgique, avant d'abandonner les sciences pour la musique en 2026. Il étudie aujourd'hui la composition à la Sorbonne, à Paris.",
    bio5: "Il n'a jamais vu la physique et la musique comme des contraires. Toutes deux commencent par entendre une structure avant de pouvoir la démontrer, et pendant des années l'une a nourri l'autre, jusqu'à ce qu'il doive choisir.",
    bio6: "Sa musique va de la ligne soliste aux grandes pages d'ensemble et de chœur. Les heures qu'il ne passe pas sur ses propres partitions, il les consacre à restaurer celles des autres.",
    bio4Pre: "Parallèlement à ses propres œuvres, il dirige le ",
    bio4Project: "Projet de restauration Lili Boulanger",
    bio4Post:
      ", préparant de nouvelles éditions de ses manuscrits et les publiant gratuitement sur IMSLP.",
    accolades: [
      { title: "1ʳᵉ place · Harmonie et orchestration", body: "Concours de composition ICS" },
      { title: "4ᵉ place · Classement général", body: "Concours de composition ICS" },
    ],
  },

  services: {
    lede: "L'essentiel de ce qui parvient à ce bureau relève de la collaboration : un chef à la recherche d'une œuvre, un ensemble entre deux commandes, un éditeur dont le manuscrit réclame une édition propre. Des prestations concrètes, sur mesure, pensées pour ceux qui les joueront.",
    dept: "Annonces",
    headline: "Le compositeur propose ses services",
    deck: "Commandes, gravure, orchestration et enseignement, pour les interprètes et les institutions.",
    byline: "Petites annonces",
    title: "Services",
    subtitle: "Au service des interprètes et des institutions",
    badgeOpen: "Ouvert",
    badgeClosed: "Fermé",
    items: [
      {
        title: "Commandes",
        body: "Œuvres nouvelles pour solistes, ensembles de chambre, chœurs et orchestres, écrites en dialogue étroit avec les interprètes qui les créent.",
      },
      {
        title: "Gravure et éditions",
        body: "Gravures nettes et fidèles de manuscrits et d'éditions usées, de la simple partie à la partition critique complète, prêtes à la publication.",
      },
      {
        title: "Orchestration et arrangement",
        body: "Orchestration d'œuvres pour clavier et de musique de chambre pour de plus grands effectifs, et arrangements idiomatiques adaptés à chaque ensemble.",
      },
      {
        title: "Enseignement",
        body: "Cours particuliers de piano, d'harmonie, de contrepoint et de composition, adaptés à chaque élève.",
      },
    ],
    ctaPre: "Chaque projet commence par une conversation, alors ",
    ctaLink: "prenons contact",
    ctaPost: ".",
  },

  commissions: {
    dept: "Annonces · Commandes",
    headline: "Commander une œuvre, étape par étape",
    deck: "De la première demande aux parties gravées, déposées entre les mains des musiciens.",
    byline: "Service des commandes",
    title: "Commandes",
    sealOpen: "Commandes ouvertes",
    sealClosed: "Commandes fermées",
    ledeOpen:
      "J'accepte actuellement un nombre limité de commandes, de la pièce soliste ou de chambre aux grandes œuvres pour ensemble et pour chœur. Les créneaux sont attribués selon la date de création.",
    ledeClosed:
      "Le carnet de commandes est complet pour le moment, le temps d'achever les œuvres en cours. Les demandes restent les bienvenues ! Écrivez-moi à l'avance et vous serez prioritaire à sa réouverture.",
    steps: [
      {
        title: "Demande",
        body: "Écrivez-moi l'essentiel : l'effectif, l'occasion, la durée souhaitée et la date de création.",
      },
      {
        title: "Échange",
        body: "Nous discutons du caractère, du contexte de programmation et des contraintes pratiques, puis convenons de l'ampleur, des honoraires et du calendrier.",
      },
      {
        title: "Esquisse et brouillon",
        body: "Vous recevez une esquisse en début d'écriture pour réagir, avant l'achèvement du brouillon complet.",
      },
      {
        title: "Partition et parties",
        body: "Livraison de la partition gravée définitive et des parties, avec révisions jusqu'aux premières répétitions.",
      },
    ],
    ctaOpen: "Demander une commande",
    ctaClosed: "Renseignez-vous sur mes disponibilités",
  },

  agenda: {
    dept: "Carnet de concerts",
    headline: "Là où la musique se joue",
    deck: "Créations et concerts, passés et à venir.",
    byline: "Carnet de concerts",
    title: "Concerts",
    upcoming: "À venir",
    past: "Passés",
    tickets: "Billetterie",
    none: "Aucune date annoncée pour l'instant. Revenez bientôt, ou écrivez-moi et je vous préviendrai en premier.",
    pastHiddenKicker: "En révision",
    pastHiddenLine1: "L'archive des dates passées fait l'objet d'un changement d'architecture.",
    pastHiddenLine2: "Merci de votre patience pendant que tout est retravaillé.",
    roles: {
      composer: "Compositeur",
      pianist: "Pianiste",
      conductor: "Chef d’orchestre",
      lecturer: "Conférencier",
    },
  },

  notFound: {
    kicker: "Erreur 404 — Hors des archives",
    headline: "Cette édition est introuvable.",
    deck: "La page demandée ne figure pas dans nos archives. Peut-être n'a-t-elle jamais été imprimée, ou le lien a changé depuis.",
    back: "Retour à la une",
  },

  dispatches: {
    dept: "Dépêches",
    headline: "Nouvelles du bureau",
    deck: "Bulletins sur les créations, les prix et les nouvelles éditions, au fil de l'eau.",
    byline: "La rédaction",
    readMore: "Lire la suite",
    none: "Aucun bulletin pour l'instant.",
  },

  contact: {
    dept: "Correspondance",
    headline: "Écrivez au compositeur",
    deck: "Ouvert aux interprètes, aux ensembles, aux institutions, et aux simples curieux.",
    byline: "Le bureau de la rédaction",
    title: "Contact",
    eyebrow: "Un mot du compositeur",
    salutation: "Cher lecteur,",
    p1: "Je suis toujours heureux d'avoir des nouvelles d'interprètes, d'ensembles et d'institutions en quête d'œuvres nouvelles, qu'il s'agisse d'une partition originale ou de faire revivre un répertoire oublié.",
    p2: "Je me charge aussi de la gravure, de l'orchestration et de l'arrangement, et j'enseigne le piano et la composition.",
    p3: "Si quoi que ce soit de tout cela peut vous être utile, écrivez-moi directement :",
    p4: "Et si vous aimez simplement ce que je fais et souhaitez le soutenir, vous pouvez m'offrir un café :",
    kofi: "Soutenir sur Ko-fi",
    closing: "Bien à vous,",
  },

  book: {
    dept: "Restauration",
    headline: "Un Prix de Rome oublié, rendu à la page",
    deck: "Un projet regrave les manuscrits négligés de Lili Boulanger et les rend, librement, aux interprètes du monde entier.",
    byline: "Reportage spécial",
    titleTop: "Le Projet de restauration",
    titleSub: "Lili Boulanger",
    p1: "Lili Boulanger (1893-1918) fut la première femme à remporter le Prix de Rome ; un siècle plus tard, une grande partie de sa musique n'a toujours pas d'édition moderne digne de ce nom, et certaines pièces n'ont jamais été publiées. Ses manuscrits dorment, dispersés dans les archives, dans l'attente d'être entendus tels qu'elle les voulait.",
    p2: "Ce projet entend y remédier. Chaque œuvre est regravée d'après ses manuscrits et ses esquisses, fidèle à sa notation et débarrassée des fautes accumulées en un siècle de copies, afin qu'un interprète, où qu'il soit, puisse simplement ouvrir la partition et jouer.",
    p3: "Le travail se poursuit. La bibliothèque s'enrichit de chaque édition achevée, et toutes paraissent librement sur IMSLP.",
    p4: "Chaque édition achevée rejoint un catalogue qui s'étoffe, libre d'être téléchargé et joué ; le but est simplement que sa musique circule de nouveau.",
    viewCatalogue: "Voir son catalogue complet",
    portraitCaption: "Première femme à remporter le Prix de Rome",
  },

  rack: {
    review: "Les pièces réunies ici vont de la ligne soliste à l'écriture pour grand ensemble et pour chœur, chacune versée au catalogue à mesure qu'elle est achevée. C'est une sélection ; le catalogue complet est plus vaste.",
    dept: "Les Arts · Critique",
    headline: "Le compositeur dévoile une saison d'œuvres nouvelles",
    deck: "Compositions choisies pour solistes, ensembles, chœur et orchestre.",
    byline: "Service du catalogue",
    title: "Œuvres en vedette",
    subtitle: "Compositions choisies",
    allCompositions: "Toutes les compositions",
    awarded: "Primée",
    listen: "Écouter",
    instrumentation: "Instrumentation",
    open: "Ouvrir →",
    maintenanceKicker: "En révision",
    maintenanceLine1: "Cette section fait l'objet d'un changement d'architecture.",
    maintenanceLine2: "Merci de votre patience pendant que tout est retravaillé.",
  },

  modal: {
    recognition: "Distinctions",
    about: "À propos de l'œuvre",
    influences: "Influences",
    instrumentation: "Instrumentation",
    close: "Fermer",
    clickOutside: "Cliquez à l'extérieur pour fermer",
  },

  library: {
    title: "Catalogue des œuvres",
    countLine: (n: number) => `Hachem · ${n} compositions`,
    byInstrumentation: "Par instrumentation",
    allWorks: "Toutes les œuvres",
    all: "Toutes",
    workCount: (n: number) => `${n} ${n === 1 ? "œuvre" : "œuvres"}`,
    footer: "Cliquez sur une œuvre pour voir la partition et les détails",
  },

  categories: {
    labels: {
      "Large Ensemble": "Grand ensemble",
      "Chamber Music": "Musique de chambre",
      "Piano Solo": "Piano seul",
      "Voice & Piano": "Voix et piano",
    },
    descriptions: {
      "Large Ensemble": "Orchestre, chœur et grands effectifs",
      "Chamber Music": "Petites formations instrumentales",
      "Piano Solo": "Œuvres pour piano seul",
      "Voice & Piano": "Chansons et mélodies",
    },
  },

  lili: {
    name: "Lili Boulanger",
    headerLine: (works: number, editions: number) =>
      `1893 – 1918 · ${works} œuvres · ${editions} ${
        editions === 1 ? "édition restaurée" : "éditions restaurées"
      }`,
    byInstrumentation: "Par instrumentation",
    allWorks: "Toutes les œuvres",
    all: "Toutes",
    workCount: (n: number) => `${n} ${n === 1 ? "œuvre" : "œuvres"}`,
    edition: "Édition",
    footer: "D'autres éditions sont à venir.",
    categoryLabels: {
      All: "Toutes les œuvres",
      Piano: "Piano",
      Chamber: "Musique de chambre",
      Voice: "Voix",
      Choral: "Chœur",
    },
    categoryDescriptions: {
      All: "Catalogue complet",
      Piano: "Œuvres pour piano seul",
      Chamber: "Chambre et instrumental",
      Voice: "Mélodies pour voix",
      Choral: "Chœur et orchestre",
    },
  },

  audio: {
    play: "Lecture",
    pause: "Pause",
    seek: "Naviguer",
    mute: "Couper le son",
    unmute: "Rétablir le son",
  },

  footer: {
    fine: "𝄂    fine.",
  },

  seo: {
    title: "Hachem — Journal du compositeur",
    description:
      "Compositeur, pianiste et chef d'orchestre à Paris, étudiant à la Sorbonne, créant des œuvres nouvelles du piano solo à l'orchestre, publiant des éditions gratuites de Lili Boulanger sur IMSLP, et acceptant des commandes.",
  },
};

/* ------------------------------------------------------------------ */
/* German dictionary.                                                  */
/* ------------------------------------------------------------------ */

const de: Dict = {
  masthead: "Hachem — Das Komponistenblatt",
  language: {
    label: "Sprache",
    en: "English",
    fr: "Français",
    switchTo: "Auf Deutsch wechseln",
  },

  nav: {
    about: "Biografie",
    works: "Werke",
    agenda: "Konzerte",
    dispatches: "Depeschen",
    projects: "Projekte",
    services: "Leistungen",
    commissions: "Aufträge",
    contact: "Kontakt",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
  },

  hero: {
    subtitle: "Komponist · Pianist · Dirigent",
    scroll: "Scrollen",
  },

  front: {
    edition: "Spätausgabe",
    price: "Preis: gratis",
    place: "Paris · Beirut",
    inThisIssue: "In dieser Ausgabe",
    theLead: "Aufmacher — Porträt",
    continued: "Fortsetzung in Nr. 01 — Porträt →",
    motto: "Neues komponieren, Altes wiederbeleben.",
    leadPhoto: "Leitfoto",
    cutline: "Das Instrument, für das die Chiffre geschrieben wurde.",
  },
  about: {
    dept: "Porträt",
    headline: "Vom Solfège an die Sorbonne",
    deck: "Ein autodidaktischer libanesischer Komponist, der die Physik aufgab, um die klassischen Formen zu schreiben, die er aus Partituren lernte – nicht von Lehrern.",
    byline: "Von unserem Musikkorrespondenten",
    title: "Biografie",
    timeline: "Werdegang",
    recognition: "Auszeichnungen",
    ageLabel: (age: string) => (/^\d{4}$/.test(age) ? age : `Mit ${age} Jahren`),
    milestones: [
      "Beginnt mit dem Musikunterricht.",
      "Erste Kompositionen: Melodien in Solfège-Silben notiert, noch bevor er ein Notensystem lesen konnte.",
      "Wendet sich dem ernsthaften Selbststudium zu: Harmonielehre, Kontrapunkt, Formenlehre. Schreibt Kanons, Sonaten und Fugen ohne formalen Unterricht.",
      "Verlässt den Libanon, um Physik und Mathematik zu studieren – an Universitäten in Frankreich und später in Belgien.",
      "Verlässt die Wissenschaft, um sich ganz der Musik zu widmen. Studiert heute Komposition an der Sorbonne in Paris.",
    ],
    bio1: "PARIS — Mit vier Jahren begann er mit der Musik, mit sechs zu komponieren. Seine Melodien notierte er in Solfège-Silben, weil er noch keine Noten lesen konnte.",
    bio2: "Mit dreizehn wurde das Lernen zur eigenen Disziplin. Harmonielehre und Kontrapunkt erarbeitete er sich allein und füllte Hefte mit Kanons, Sonaten und Fugen; was er über die klassischen Formen weiß, entnahm er den Partituren selbst, nicht den Lehrern.",
    bio3: "Im Libanon geboren, verließ er das Land mit siebzehn, um Physik und Mathematik zu studieren, erst in Frankreich, dann in Belgien, ehe er 2026 die Wissenschaften für die Musik aufgab. Heute studiert er Komposition an der Sorbonne in Paris.",
    bio5: "Physik und Musik waren für ihn nie Gegensätze. Beide beginnen damit, eine Struktur zu hören, bevor man sie beweisen kann, und jahrelang nährte die eine die andere, bis er sich entscheiden musste.",
    bio6: "Seine eigene Musik reicht von der Solostimme bis zu großen Ensemble- und Chorsätzen. Die Stunden, die nicht den eigenen Partituren gehören, widmet er der Restaurierung fremder Werke.",
    bio4Pre: "Neben dem eigenen Schaffen leitet er das ",
    bio4Project: "Lili-Boulanger-Restaurierungsprojekt",
    bio4Post:
      " und erstellt neue Editionen ihrer Manuskripte, die er frei auf IMSLP veröffentlicht.",
    accolades: [
      { title: "1. Platz · Harmonik & Orchestrierung", body: "ICS-Kompositionswettbewerb" },
      { title: "4. Platz · Gesamtwertung", body: "ICS-Kompositionswettbewerb" },
    ],
  },

  services: {
    lede: "Das meiste, was diesen Schreibtisch erreicht, ist Zusammenarbeit: ein Dirigent, der ein Programm füllen will, ein Ensemble zwischen zwei Aufträgen, ein Verlag mit einem Manuskript, das eine saubere Ausgabe braucht. Praktische Leistungen, auf Bestellung gefertigt und auf die Menschen zugeschnitten, die sie aufführen werden.",
    dept: "Anzeigen",
    headline: "Der Komponist bietet seine Dienste an",
    deck: "Auftragswerke, Notensatz, Orchestrierung und Unterricht, für Interpreten und Institutionen.",
    byline: "Geschäftsanzeigen",
    title: "Leistungen",
    subtitle: "Zusammenarbeit mit Interpreten und Institutionen",
    badgeOpen: "Offen",
    badgeClosed: "Geschlossen",
    items: [
      {
        title: "Aufträge",
        body: "Neue Werke für Solisten, Kammerensembles, Chöre und Orchester, in enger Abstimmung mit den Interpreten geschrieben, die sie uraufführen.",
      },
      {
        title: "Notensatz & Editionen",
        body: "Saubere, originalgetreue Notenstiche von Manuskripten und abgenutzten Ausgaben, von der Einzelstimme bis zur vollständigen kritischen Partitur, druckfertig.",
      },
      {
        title: "Orchestrierung & Arrangement",
        body: "Orchestrierung von Klavier- und Kammermusikwerken für größere Besetzungen sowie idiomatische Arrangements, zugeschnitten auf das jeweilige Ensemble.",
      },
      {
        title: "Unterricht",
        body: "Privatunterricht in Klavier, Harmonielehre, Kontrapunkt und Komposition, individuell auf jeden Schüler abgestimmt.",
      },
    ],
    ctaPre: "Jedes Projekt beginnt mit einem Gespräch – ",
    ctaLink: "nehmen Sie Kontakt auf",
    ctaPost: ".",
  },

  commissions: {
    dept: "Anzeigen · Aufträge",
    headline: "Ein Werk in Auftrag geben, Schritt für Schritt",
    deck: "Von der ersten Anfrage bis zu den gestochenen Stimmen in den Händen der Musiker.",
    byline: "Auftrags-Redaktion",
    title: "Aufträge",
    sealOpen: "Aufträge offen",
    sealClosed: "Aufträge geschlossen",
    ledeOpen:
      "Derzeit nehme ich eine begrenzte Zahl von Aufträgen an – von Solo- und Kammermusikstücken bis zu großen Ensemble- und Chorwerken. Die Plätze werden nach Uraufführungsdatum vergeben.",
    ledeClosed:
      "Das Auftragsbuch ist im Moment voll, während die laufenden Werke fertiggestellt werden. Anfragen sind dennoch willkommen! Schreiben Sie im Voraus, und Sie stehen ganz oben auf der Liste, sobald das Buch wieder öffnet.",
    steps: [
      {
        title: "Anfrage",
        body: "Schreiben Sie mir das Wesentliche: Besetzung, Anlass, gewünschte Dauer und Uraufführungsdatum.",
      },
      {
        title: "Gespräch",
        body: "Wir besprechen Charakter, Programmkontext und praktische Vorgaben und einigen uns dann auf Umfang, Honorar und Zeitplan.",
      },
      {
        title: "Skizze & Entwurf",
        body: "Sie erhalten früh im Schreibprozess eine Skizze für Ihr Feedback, noch bevor der vollständige Entwurf fertig ist.",
      },
      {
        title: "Partitur & Stimmen",
        body: "Lieferung der endgültigen, gestochenen Partitur und Stimmen, mit Überarbeitungen bis zu den ersten Proben.",
      },
    ],
    ctaOpen: "Einen Auftrag anfragen",
    ctaClosed: "Nach künftiger Verfügbarkeit fragen",
  },

  agenda: {
    dept: "Konzertkalender",
    headline: "Wo die Musik erklingt",
    deck: "Uraufführungen und Konzerte, vergangene und kommende.",
    byline: "Konzertkalender",
    title: "Konzerte",
    upcoming: "Demnächst",
    past: "Vergangen",
    tickets: "Karten",
    none: "Zurzeit sind keine Termine angekündigt. Schauen Sie bald wieder vorbei, oder schreiben Sie mir, dann erfahren Sie es als Erster.",
    pastHiddenKicker: "In Überarbeitung",
    pastHiddenLine1: "Das Archiv vergangener Termine wird derzeit umstrukturiert.",
    pastHiddenLine2: "Bitte haben Sie etwas Geduld, während alles überarbeitet wird.",
    roles: {
      composer: "Komponist",
      pianist: "Pianist",
      conductor: "Dirigent",
      lecturer: "Dozent",
    },
  },

  notFound: {
    kicker: "Fehler 404 — Nicht in den Akten",
    headline: "Diese Ausgabe wurde nicht gefunden.",
    deck: "Die angeforderte Seite ist nicht in unseren Aufzeichnungen. Vielleicht wurde sie nie gedruckt, oder der Link hat sich inzwischen geändert.",
    back: "Zurück zur Titelseite",
  },

  dispatches: {
    dept: "Depeschen",
    headline: "Nachrichten aus der Redaktion",
    deck: "Meldungen zu Uraufführungen, Preisen und neuen Ausgaben, sobald sie eintreffen.",
    byline: "Redaktion",
    readMore: "Weiterlesen",
    none: "Noch keine Meldungen.",
  },

  contact: {
    dept: "Korrespondenz",
    headline: "Schreiben Sie dem Komponisten",
    deck: "Offen für Interpreten, Ensembles, Institutionen und einfach Neugierige.",
    byline: "Aus der Redaktion",
    title: "Kontakt",
    eyebrow: "Ein Wort des Komponisten",
    salutation: "Liebe Leserin, lieber Leser,",
    p1: "Ich höre immer gern von Interpreten, Ensembles und Institutionen, die neue Werke suchen, sei es eine eigens geschriebene Partitur oder das Wiederbeleben vergessener Musik.",
    p2: "Ebenso übernehme ich Notensatz, Orchestrierung und Bearbeitung, und ich unterrichte Klavier und Komposition.",
    p3: "Wenn Ihnen davon etwas nützlich sein könnte, schreiben Sie mir direkt:",
    p4: "Und wenn Ihnen einfach gefällt, was ich tue, und Sie es unterstützen möchten, können Sie mir einen Kaffee ausgeben:",
    kofi: "Auf Ko-fi unterstützen",
    closing: "Herzlich,",
  },

  book: {
    dept: "Restaurierung",
    headline: "Ein vergessener Prix de Rome, neu ediert",
    deck: "Ein Projekt sticht Lili Boulangers vernachlässigte Manuskripte neu und gibt sie – frei – den Interpreten überall zurück.",
    byline: "Sonderbericht",
    titleTop: "Das Restaurierungsprojekt",
    titleSub: "Lili Boulanger",
    p1: "Lili Boulanger (1893–1918) war die erste Frau, die den Prix de Rome gewann; ein Jahrhundert später fehlt einem Großteil ihrer Musik noch immer eine ordentliche moderne Ausgabe, und manches wurde nie förmlich veröffentlicht. Ihre Manuskripte liegen verstreut in den Archiven und warten darauf, so gehört zu werden, wie sie es wollte.",
    p2: "Dieses Projekt will das ändern. Jedes Werk wird nach ihren Manuskripten und Skizzen neu gestochen, getreu ihrer Notation und befreit von den Fehlern, die sich über hundert Jahre des Abschreibens eingeschlichen haben, damit Interpreten überall die Partitur einfach aufschlagen und spielen können.",
    p3: "Die Arbeit dauert an. Die Bibliothek wächst mit jeder fertigen Ausgabe, und jede erscheint frei auf IMSLP.",
    p4: "Jede fertige Ausgabe ergänzt einen wachsenden Katalog, frei zum Herunterladen und Aufführen; das Ziel ist schlicht, dass ihre Musik wieder erklingt.",
    viewCatalogue: "Ihren vollständigen Werkkatalog ansehen",
    portraitCaption: "Erste Frau, die den Prix de Rome gewann",
  },

  rack: {
    review: "Die hier versammelten Stücke reichen von der Solostimme bis zum großen Ensemble- und Chorsatz, jedes dem Katalog hinzugefügt, sobald es fertig ist. Das ist eine Auswahl; der vollständige Katalog ist länger.",
    dept: "Feuilleton · Kritik",
    headline: "Der Komponist stellt eine Reihe neuer Werke vor",
    deck: "Ausgewählte Kompositionen für Solisten, Kammerbesetzungen, Chor und Orchester.",
    byline: "Katalog-Redaktion",
    title: "Ausgewählte Werke",
    subtitle: "Eine Auswahl an Kompositionen",
    allCompositions: "Alle Kompositionen",
    awarded: "Ausgezeichnet",
    listen: "Anhören",
    instrumentation: "Besetzung",
    open: "Öffnen →",
    maintenanceKicker: "In Überarbeitung",
    maintenanceLine1: "Dieser Bereich wird derzeit umstrukturiert.",
    maintenanceLine2: "Bitte haben Sie etwas Geduld, während alles überarbeitet wird.",
  },

  modal: {
    recognition: "Auszeichnungen",
    about: "Über dieses Werk",
    influences: "Einflüsse",
    instrumentation: "Besetzung",
    close: "Schließen",
    clickOutside: "Zum Schließen außerhalb klicken",
  },

  library: {
    title: "Werkverzeichnis",
    countLine: (n: number) => `Hachem · ${n} Kompositionen`,
    byInstrumentation: "Nach Besetzung",
    allWorks: "Alle Werke",
    all: "Alle",
    workCount: (n: number) => `${n} ${n === 1 ? "Werk" : "Werke"}`,
    footer: "Klicken Sie auf ein Werk, um Partitur und Details zu sehen",
  },

  categories: {
    labels: {
      "Large Ensemble": "Großes Ensemble",
      "Chamber Music": "Kammermusik",
      "Piano Solo": "Klavier solo",
      "Voice & Piano": "Gesang & Klavier",
    },
    descriptions: {
      "Large Ensemble": "Orchester, Chor und große Besetzungen",
      "Chamber Music": "Kleine instrumentale Besetzungen",
      "Piano Solo": "Werke für Klavier allein",
      "Voice & Piano": "Lieder und Mélodies",
    },
  },

  lili: {
    name: "Lili Boulanger",
    headerLine: (works: number, editions: number) =>
      `1893 – 1918 · ${works} Werke · ${editions} ${
        editions === 1 ? "restaurierte Edition" : "restaurierte Editionen"
      }`,
    byInstrumentation: "Nach Besetzung",
    allWorks: "Alle Werke",
    all: "Alle",
    workCount: (n: number) => `${n} ${n === 1 ? "Werk" : "Werke"}`,
    edition: "Edition",
    footer: "Weitere Editionen sind in Arbeit.",
    categoryLabels: {
      All: "Alle Werke",
      Piano: "Klavier",
      Chamber: "Kammermusik",
      Voice: "Gesang",
      Choral: "Chor",
    },
    categoryDescriptions: {
      All: "Vollständiges Verzeichnis",
      Piano: "Werke für Klavier solo",
      Chamber: "Kammermusik & Instrumental",
      Voice: "Lieder für Gesang",
      Choral: "Chor & Orchester",
    },
  },

  audio: {
    play: "Abspielen",
    pause: "Pause",
    seek: "Suchen",
    mute: "Stummschalten",
    unmute: "Ton ein",
  },

  footer: {
    fine: "𝄂    fine.",
  },

  seo: {
    title: "Hachem — Das Komponistenblatt",
    description:
      "Komponist, Pianist und Dirigent in Paris, Student an der Sorbonne, schafft neue Werke vom Klavier solo bis zum Orchester, veröffentlicht kostenlose Lili-Boulanger-Editionen auf IMSLP und nimmt Auftragswerke an.",
  },
};

export const translations: Record<Lang, Dict> = { en, fr, de };

/* ------------------------------------------------------------------ */
/* Shared lookup maps for data that lives outside the dictionaries.    */
/* ------------------------------------------------------------------ */

/** English instrument token → French. Used for composition instrumentation. */
const instrumentFr: Record<string, string> = {
  "Piccolo": "Piccolo",
  "Flute": "Flûte",
  "2 Flutes": "2 Flûtes",
  "2 Oboes": "2 Hautbois",
  "Cor Anglais": "Cor anglais",
  "2 Clarinets": "2 Clarinettes",
  "2 Clarinets in A": "2 Clarinettes en la",
  "Bass Clarinet": "Clarinette basse",
  "2 Bassoons": "2 Bassons",
  "Sarrusophone": "Sarrusophone",
  "4 Horns": "4 Cors",
  "4 Trumpets": "4 Trompettes",
  "3 Trumpets": "3 Trompettes",
  "3 Trombones": "3 Trombones",
  "Tuba": "Tuba",
  "Timpani": "Timbales",
  "3 Timpani": "3 Timbales",
  "Cymbals": "Cymbales",
  "Celesta": "Célesta",
  "Harp": "Harpe",
  "2 Harps": "2 Harpes",
  "Organ": "Orgue",
  "Soprano": "Soprano",
  "Mezzo-Soprano": "Mezzo-soprano",
  "Alto": "Alto",
  "Tenor": "Ténor",
  "Bass": "Basse",
  "Violins I": "Violons I",
  "Violins II": "Violons II",
  "Violin I": "Violon I",
  "Violin II": "Violon II",
  "Violin": "Violon",
  "Violas": "Altos",
  "Viola": "Alto",
  "Cellos": "Violoncelles",
  "Cello": "Violoncelle",
  "Double Basses": "Contrebasses",
  "Piano": "Piano",
};

/** English instrument token → German. */
const instrumentDe: Record<string, string> = {
  "Piccolo": "Piccoloflöte",
  "Flute": "Flöte",
  "2 Flutes": "2 Flöten",
  "2 Oboes": "2 Oboen",
  "Cor Anglais": "Englischhorn",
  "2 Clarinets": "2 Klarinetten",
  "2 Clarinets in A": "2 Klarinetten in A",
  "Bass Clarinet": "Bassklarinette",
  "2 Bassoons": "2 Fagotte",
  "Sarrusophone": "Sarrusophon",
  "4 Horns": "4 Hörner",
  "4 Trumpets": "4 Trompeten",
  "3 Trumpets": "3 Trompeten",
  "3 Trombones": "3 Posaunen",
  "Tuba": "Tuba",
  "Timpani": "Pauken",
  "3 Timpani": "3 Pauken",
  "Cymbals": "Becken",
  "Celesta": "Celesta",
  "Harp": "Harfe",
  "2 Harps": "2 Harfen",
  "Organ": "Orgel",
  "Soprano": "Sopran",
  "Mezzo-Soprano": "Mezzosopran",
  "Alto": "Alt",
  "Tenor": "Tenor",
  "Bass": "Bass",
  "Violins I": "Violinen I",
  "Violins II": "Violinen II",
  "Violin I": "Violine I",
  "Violin II": "Violine II",
  "Violin": "Violine",
  "Violas": "Violen",
  "Viola": "Viola",
  "Cellos": "Violoncelli",
  "Cello": "Violoncello",
  "Double Basses": "Kontrabässe",
  "Piano": "Klavier",
};

export function tInstrument(token: string, lang: Lang): string {
  if (lang === "fr") return instrumentFr[token] ?? token;
  if (lang === "de") return instrumentDe[token] ?? token;
  return token;
}

/** Lili Boulanger instrumentation strings: English → French. */
const liliInstrumentationFr: Record<string, string> = {
  "Piano": "Piano",
  "Choir (SATB) and piano": "Chœur (SATB) et piano",
  "Violin and piano": "Violon et piano",
  "Vocal quartet (SATT) and piano/orchestra": "Quatuor vocal (SATT) et piano/orchestre",
  "Soprano, chorus and piano": "Soprano, chœur et piano",
  "Voice and piano": "Voix et piano",
  "Voice and piano/orchestra": "Voix et piano/orchestre",
  "Contralto, chorus and piano": "Contralto, chœur et piano",
  "Baritone, chorus and piano": "Baryton, chœur et piano",
  "Soprano, tenor and orchestra": "Soprano, ténor et orchestre",
  "Mezzo-soprano, tenor, baritone, chorus and orchestra":
    "Mezzo-soprano, ténor, baryton, chœur et orchestre",
  "Chorus, organ and orchestra": "Chœur, orgue et orchestre",
  "Baritone and orchestra": "Baryton et orchestre",
  "Two solo voices, chorus, organ and orchestra":
    "Deux voix solistes, chœur, orgue et orchestre",
  "Tenor, chorus and orchestra": "Ténor, chœur et orchestre",
  "Voice, string quartet, harp and organ": "Voix, quatuor à cordes, harpe et orgue",
  "Orchestra": "Orchestre",
};

/** Lili Boulanger instrumentation strings: English → German. */
const liliInstrumentationDe: Record<string, string> = {
  "Piano": "Klavier",
  "Choir (SATB) and piano": "Chor (SATB) und Klavier",
  "Violin and piano": "Violine und Klavier",
  "Vocal quartet (SATT) and piano/orchestra": "Vokalquartett (SATT) und Klavier/Orchester",
  "Soprano, chorus and piano": "Sopran, Chor und Klavier",
  "Voice and piano": "Singstimme und Klavier",
  "Voice and piano/orchestra": "Singstimme und Klavier/Orchester",
  "Contralto, chorus and piano": "Alt, Chor und Klavier",
  "Baritone, chorus and piano": "Bariton, Chor und Klavier",
  "Soprano, tenor and orchestra": "Sopran, Tenor und Orchester",
  "Mezzo-soprano, tenor, baritone, chorus and orchestra":
    "Mezzosopran, Tenor, Bariton, Chor und Orchester",
  "Chorus, organ and orchestra": "Chor, Orgel und Orchester",
  "Baritone and orchestra": "Bariton und Orchester",
  "Two solo voices, chorus, organ and orchestra":
    "Zwei Solostimmen, Chor, Orgel und Orchester",
  "Tenor, chorus and orchestra": "Tenor, Chor und Orchester",
  "Voice, string quartet, harp and organ": "Singstimme, Streichquartett, Harfe und Orgel",
  "Orchestra": "Orchester",
};

/** Lili Boulanger text/source descriptors that are generic (poet names pass through). */
const liliTextFr: Record<string, string> = {
  "Psalm 24": "Psaume 24",
  "Psalm 129": "Psaume 129",
  "Psalm 130": "Psaume 130",
  "Extract from the Metta Sutta": "Extrait du Metta Sutta",
  "Tridentine Missal": "Missel tridentin",
};

const liliTextDe: Record<string, string> = {
  "Psalm 24": "Psalm 24",
  "Psalm 129": "Psalm 129",
  "Psalm 130": "Psalm 130",
  "Extract from the Metta Sutta": "Auszug aus dem Metta-Sutta",
  "Tridentine Missal": "Tridentinisches Messbuch",
};

export function tLiliInstrumentation(value: string, lang: Lang): string {
  if (lang === "fr") return liliInstrumentationFr[value] ?? value;
  if (lang === "de") return liliInstrumentationDe[value] ?? value;
  return value;
}

export function tLiliText(value: string, lang: Lang): string {
  if (lang === "fr") return liliTextFr[value] ?? value;
  if (lang === "de") return liliTextDe[value] ?? value;
  return value;
}
