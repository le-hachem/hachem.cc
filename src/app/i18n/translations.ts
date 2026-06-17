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
  language: {
    label: "Language",
    en: "English",
    fr: "Français",
    switchTo: "Passer en français",
  },

  nav: {
    about: "About",
    works: "Works",
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

  about: {
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
    bio1:
      "Hachem began learning music at four and was composing by six, writing melodies in solfège syllables because he had not yet learned to read a stave.",
    bio2:
      "At thirteen he took up serious self-study, working through harmony and counterpoint on his own and writing canons, sonatas and fugues. Most of what he knows of the classical forms he learned this way, from scores rather than teachers.",
    bio3:
      "Born in Lebanon, he left at seventeen to study physics and mathematics in France and then Belgium. In 2026 he left academia for music entirely, and now studies composition at the Sorbonne in Paris.",
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

  contact: {
    title: "Contact",
    eyebrow: "A note from the composer",
    salutation: "Dear reader,",
    p1: "I am always glad to hear from performers, ensembles and institutions looking for new work, whether that means an original composition or the revival of overlooked repertoire.",
    p2: "I also take on engraving, orchestration and arrangement work, and teach piano and composition.",
    p3: "If any of this sounds useful, write to me here:",
    p4: "And if you simply enjoy what I do and want to support it, you can buy me a coffee:",
    kofi: "Support on Ko-fi",
    closing: "Warmly,",
  },

  book: {
    titleTop: "The Lili Boulanger",
    titleSub: "Restoration Project",
    p1: "Lili Boulanger (1893–1918) was the first woman to win the Prix de Rome, yet many of her works remain without proper modern editions and some have never been formally published at all. Her manuscripts, scattered across archives, deserve to be heard as she intended.",
    p2: "The Restoration Project aims to change that. Each piece is re-engraved from her manuscripts and sketches, faithful to her notation and free of the errors that crept in over a century of copies, so that performers anywhere can simply pick up the score and play.",
    p3: "This is ongoing work. The library grows as editions are finished, and every one of them is published freely on IMSLP.",
    viewCatalogue: "View her complete catalogue",
    portraitCaption: "First woman to win the Prix de Rome",
  },

  rack: {
    title: "Featured Works",
    subtitle: "Selected Compositions",
    allCompositions: "All Compositions",
    awarded: "Awarded",
    listen: "Listen",
    instrumentation: "Instrumentation",
    open: "Open →",
    maintenanceLine1: "Currently compositions are hidden due to maintenance,",
    maintenanceLine2: "check back in a few days.",
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
    /** e.g. "Hachem H. · 7 compositions" */
    countLine: (n: number) => `Hachem H. · ${n} compositions`,
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
    title: "Hachem H. · Composer · Pianist · Conductor",
    description:
      "Composer and pianist in Paris, studying at the Sorbonne. New works from solo pieces to cantatas, free editions of Lili Boulanger's manuscripts on IMSLP, plus commissions, engraving and teaching.",
  },
};

/** The dictionary shape every language must satisfy. */
export type Dict = typeof en;

/* ------------------------------------------------------------------ */
/* French dictionary.                                                  */
/* ------------------------------------------------------------------ */

const fr: Dict = {
  language: {
    label: "Langue",
    en: "English",
    fr: "Français",
    switchTo: "Switch to English",
  },

  nav: {
    about: "Biographie",
    works: "Œuvres",
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

  about: {
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
    bio1:
      "Hachem commence la musique à quatre ans et compose dès six ans, écrivant ses mélodies en syllabes de solfège faute de savoir encore lire une portée.",
    bio2:
      "À treize ans, il se lance dans un apprentissage autodidacte rigoureux, travaillant seul l'harmonie et le contrepoint et écrivant canons, sonates et fugues. C'est ainsi qu'il a appris l'essentiel des formes classiques : par les partitions plutôt que par des professeurs.",
    bio3:
      "Né au Liban, il le quitte à dix-sept ans pour étudier la physique et les mathématiques en France puis en Belgique. En 2026, il abandonne le monde universitaire pour se consacrer entièrement à la musique et étudie aujourd'hui la composition à la Sorbonne, à Paris.",
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

  contact: {
    title: "Contact",
    eyebrow: "Un mot du compositeur",
    salutation: "Cher lecteur,",
    p1: "Je suis toujours heureux d'avoir des nouvelles d'interprètes, d'ensembles et d'institutions en quête d'œuvres nouvelles, qu'il s'agisse d'une composition originale ou de la redécouverte d'un répertoire oublié.",
    p2: "Je réalise également des travaux de gravure, d'orchestration et d'arrangement, et j'enseigne le piano et la composition.",
    p3: "Si cela vous intéresse, écrivez-moi ici :",
    p4: "Et si vous appréciez simplement ce que je fais et souhaitez le soutenir, vous pouvez m'offrir un café :",
    kofi: "Soutenir sur Ko-fi",
    closing: "Bien à vous,",
  },

  book: {
    titleTop: "Le Projet de restauration",
    titleSub: "Lili Boulanger",
    p1: "Lili Boulanger (1893-1918) fut la première femme à remporter le Prix de Rome ; pourtant, nombre de ses œuvres demeurent sans édition moderne digne de ce nom, et certaines n'ont jamais été publiées. Ses manuscrits, dispersés dans les archives, méritent d'être entendus tels qu'elle les a conçus.",
    p2: "Le projet de restauration entend y remédier. Chaque pièce est regravée à partir de ses manuscrits et de ses esquisses, fidèle à sa notation et débarrassée des erreurs accumulées au fil d'un siècle de copies, afin que les interprètes du monde entier puissent simplement prendre la partition et jouer.",
    p3: "C'est un travail en cours. La bibliothèque s'enrichit à mesure que les éditions sont achevées, et chacune est publiée gratuitement sur IMSLP.",
    viewCatalogue: "Voir son catalogue complet",
    portraitCaption: "Première femme à remporter le Prix de Rome",
  },

  rack: {
    title: "Œuvres en vedette",
    subtitle: "Compositions choisies",
    allCompositions: "Toutes les compositions",
    awarded: "Primée",
    listen: "Écouter",
    instrumentation: "Instrumentation",
    open: "Ouvrir →",
    maintenanceLine1: "Les compositions sont momentanément masquées pour maintenance,",
    maintenanceLine2: "revenez dans quelques jours.",
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
    countLine: (n: number) => `Hachem H. · ${n} compositions`,
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
    title: "Hachem H. · Compositeur · Pianiste · Chef d'orchestre",
    description:
      "Compositeur et pianiste à Paris, étudiant à la Sorbonne. Œuvres nouvelles, de la pièce soliste à la cantate, éditions gratuites des manuscrits de Lili Boulanger sur IMSLP, ainsi que commandes, gravure et enseignement.",
  },
};

/* ------------------------------------------------------------------ */
/* German dictionary.                                                  */
/* ------------------------------------------------------------------ */

const de: Dict = {
  language: {
    label: "Sprache",
    en: "English",
    fr: "Français",
    switchTo: "Auf Deutsch wechseln",
  },

  nav: {
    about: "Biografie",
    works: "Werke",
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

  about: {
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
    bio1:
      "Hachem begann mit vier Jahren, Musik zu lernen, und komponierte bereits mit sechs – seine Melodien notierte er in Solfège-Silben, weil er noch kein Notensystem lesen konnte.",
    bio2:
      "Mit dreizehn nahm er ein ernsthaftes Selbststudium auf, erarbeitete sich Harmonielehre und Kontrapunkt im Alleingang und schrieb Kanons, Sonaten und Fugen. Das meiste, was er über die klassischen Formen weiß, lernte er auf diese Weise – aus Partituren statt von Lehrern.",
    bio3:
      "Im Libanon geboren, verließ er das Land mit siebzehn, um in Frankreich und dann in Belgien Physik und Mathematik zu studieren. 2026 kehrte er der Wissenschaft ganz den Rücken und studiert heute Komposition an der Sorbonne in Paris.",
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

  contact: {
    title: "Kontakt",
    eyebrow: "Ein Wort des Komponisten",
    salutation: "Liebe Leserin, lieber Leser,",
    p1: "Ich freue mich stets über Nachricht von Interpreten, Ensembles und Institutionen, die neue Werke suchen – sei es eine Originalkomposition oder die Wiederbelebung vernachlässigten Repertoires.",
    p2: "Ich übernehme außerdem Notensatz, Orchestrierung und Arrangements und unterrichte Klavier und Komposition.",
    p3: "Wenn etwas davon nützlich klingt, schreiben Sie mir hier:",
    p4: "Und wenn Ihnen einfach gefällt, was ich tue, und Sie es unterstützen möchten, können Sie mir einen Kaffee spendieren:",
    kofi: "Auf Ko-fi unterstützen",
    closing: "Herzlich,",
  },

  book: {
    titleTop: "Das Restaurierungsprojekt",
    titleSub: "Lili Boulanger",
    p1: "Lili Boulanger (1893-1918) war die erste Frau, die den Prix de Rome gewann; dennoch liegen viele ihrer Werke bis heute ohne angemessene moderne Edition vor, und einige wurden nie offiziell veröffentlicht. Ihre über Archive verstreuten Manuskripte verdienen es, so gehört zu werden, wie sie es beabsichtigte.",
    p2: "Das Restaurierungsprojekt will das ändern. Jedes Stück wird aus ihren Manuskripten und Skizzen neu gestochen – getreu ihrer Notation und befreit von den Fehlern, die sich über ein Jahrhundert des Abschreibens eingeschlichen haben –, sodass Interpreten überall die Partitur einfach zur Hand nehmen und spielen können.",
    p3: "Dies ist eine fortlaufende Arbeit. Die Bibliothek wächst, sobald Editionen fertiggestellt sind, und jede einzelne wird frei auf IMSLP veröffentlicht.",
    viewCatalogue: "Ihren vollständigen Werkkatalog ansehen",
    portraitCaption: "Erste Frau, die den Prix de Rome gewann",
  },

  rack: {
    title: "Ausgewählte Werke",
    subtitle: "Eine Auswahl an Kompositionen",
    allCompositions: "Alle Kompositionen",
    awarded: "Ausgezeichnet",
    listen: "Anhören",
    instrumentation: "Besetzung",
    open: "Öffnen →",
    maintenanceLine1: "Die Kompositionen sind derzeit wegen Wartungsarbeiten ausgeblendet,",
    maintenanceLine2: "schauen Sie in ein paar Tagen wieder vorbei.",
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
    countLine: (n: number) => `Hachem H. · ${n} Kompositionen`,
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
    title: "Hachem H. · Komponist · Pianist · Dirigent",
    description:
      "Komponist und Pianist in Paris, Student an der Sorbonne. Neue Werke von Solostücken bis zu Kantaten, kostenlose Editionen der Manuskripte Lili Boulangers auf IMSLP sowie Auftragskompositionen, Notensatz und Unterricht.",
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
