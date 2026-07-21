import type { Lang } from "./translations";

/** A localized string: one value per language. */
type L = Record<Lang, string>;

/** How the library groups the catalogue down its left rail. */
export type LiliCategory = "Piano" | "Chamber" | "Voice" | "Choral";

export interface LiliWorkSource {
  id: string;
  /** The work's own title, which stays in French in every language. */
  title: string;
  /** Year of composition; "c. 1910" and similar are fine. */
  year: string;
  category: LiliCategory;
  instrumentation: L;
  /** The text set, or its author. Poets' names are the same in every language. */
  text?: L;
  /** The restored edition, when one has been published. */
  imslpUrl?: string;
  pdfUrl?: string;
}

export interface LiliWork {
  id: string;
  title: string;
  year: string;
  category: LiliCategory;
  instrumentation: string;
  text?: string;
  /** Present when either link exists — what the "Edition" badge keys off. */
  edition?: { imslp?: string; pdf?: string };
}

/**
 * Lili Boulanger's catalogue, as listed in the restoration project's library.
 * Editions are added as they are engraved and published on IMSLP.
 *
 * The admin console at /admin edits these and regenerates this array, which is
 * easier than writing three translations by hand — but editing it here is
 * still perfectly fine.
 */
const source: LiliWorkSource[] = [
  {
    id: "prelude",
    title: "Prélude",
    year: "1911",
    category: "Piano",
    instrumentation: { en: "Piano", fr: "Piano", de: "Klavier" },
  },
  {
    id: "sous-bois",
    title: "Sous bois",
    year: "1911",
    category: "Choral",
    instrumentation: {
      en: "Choir (SATB) and piano",
      fr: "Chœur (SATB) et piano",
      de: "Chor (SATB) und Klavier",
    },
    text: { en: "Philippe Gille", fr: "Philippe Gille", de: "Philippe Gille" },
  },
  {
    id: "nocturne",
    title: "Nocturne",
    year: "1911",
    category: "Chamber",
    instrumentation: { en: "Violin and piano", fr: "Violon et piano", de: "Violine und Klavier" },
  },
  {
    id: "renouveau",
    title: "Renouveau",
    year: "1911",
    category: "Choral",
    instrumentation: {
      en: "Vocal quartet (SATT) and piano/orchestra",
      fr: "Quatuor vocal (SATT) et piano/orchestre",
      de: "Vokalquartett (SATT) und Klavier/Orchester",
    },
    text: { en: "Armand Silvestre", fr: "Armand Silvestre", de: "Armand Silvestre" },
  },
  {
    id: "les-sirenes",
    title: "Les sirènes",
    year: "1911",
    category: "Choral",
    instrumentation: {
      en: "Soprano, chorus and piano",
      fr: "Soprano, chœur et piano",
      de: "Sopran, Chor und Klavier",
    },
    text: {
      en: "Charles Grandmougin",
      fr: "Charles Grandmougin",
      de: "Charles Grandmougin",
    },
  },
  {
    id: "reflets",
    title: "Reflets",
    year: "1911",
    category: "Voice",
    instrumentation: { en: "Voice and piano", fr: "Voix et piano", de: "Singstimme und Klavier" },
    text: {
      en: "Maurice Maeterlinck",
      fr: "Maurice Maeterlinck",
      de: "Maurice Maeterlinck",
    },
  },
  {
    id: "attente",
    title: "Attente",
    year: "1912",
    category: "Voice",
    instrumentation: {
      en: "Voice and piano/orchestra",
      fr: "Voix et piano/orchestre",
      de: "Singstimme und Klavier/Orchester",
    },
    text: {
      en: "Maurice Maeterlinck",
      fr: "Maurice Maeterlinck",
      de: "Maurice Maeterlinck",
    },
    imslpUrl: "https://imslp.org/wiki/Attente_(Boulanger,_Lili)",
    pdfUrl: "https://s9.imslp.org/files/imglnks/usimg/c/cc/IMSLP974938-PMLP707817-Attente_-_Full_Score_(2025_Hachem).pdf",
  },
  {
    id: "hymne-au-soleil",
    title: "Hymne au Soleil",
    year: "1912",
    category: "Choral",
    instrumentation: {
      en: "Contralto, chorus and piano",
      fr: "Contralto, chœur et piano",
      de: "Alt, Chor und Klavier",
    },
    text: { en: "Casimir Delavigne", fr: "Casimir Delavigne", de: "Casimir Delavigne" },
  },
  {
    id: "le-retour",
    title: "Le Retour",
    year: "1912",
    category: "Voice",
    instrumentation: { en: "Voice and piano", fr: "Voix et piano", de: "Singstimme und Klavier" },
    text: { en: "Georges Delaquys", fr: "Georges Delaquys", de: "Georges Delaquys" },
  },
  {
    id: "pour-les-funerailles-dun-soldat",
    title: "Pour les funérailles d'un soldat",
    year: "1912",
    category: "Choral",
    instrumentation: {
      en: "Baritone, chorus and piano",
      fr: "Baryton, chœur et piano",
      de: "Bariton, Chor und Klavier",
    },
    text: { en: "Alfred de Musset", fr: "Alfred de Musset", de: "Alfred de Musset" },
  },
  {
    id: "soir-sur-la-plaine",
    title: "Soir sur la plaine",
    year: "1913",
    category: "Choral",
    instrumentation: {
      en: "Soprano, tenor and orchestra",
      fr: "Soprano, ténor et orchestre",
      de: "Sopran, Tenor und Orchester",
    },
    text: { en: "Albert Samain", fr: "Albert Samain", de: "Albert Samain" },
  },
  {
    id: "faust-et-helene",
    title: "Faust et Hélène",
    year: "1913",
    category: "Choral",
    instrumentation: {
      en: "Mezzo-soprano, tenor, baritone, chorus and orchestra",
      fr: "Mezzo-soprano, ténor, baryton, chœur et orchestre",
      de: "Mezzosopran, Tenor, Bariton, Chor und Orchester",
    },
    text: { en: "Eugène Adenis", fr: "Eugène Adenis", de: "Eugène Adenis" },
  },
  {
    id: "dun-jardin-clair",
    title: "D'un jardin clair",
    year: "1914",
    category: "Piano",
    instrumentation: { en: "Piano", fr: "Piano", de: "Klavier" },
  },
  {
    id: "dun-vieux-jardin",
    title: "D'un vieux jardin",
    year: "1914",
    category: "Piano",
    instrumentation: { en: "Piano", fr: "Piano", de: "Klavier" },
  },
  {
    id: "cortege",
    title: "Cortège",
    year: "1914",
    category: "Chamber",
    instrumentation: { en: "Violin and piano", fr: "Violon et piano", de: "Violine und Klavier" },
  },
  {
    id: "clairieres-dans-le-ciel",
    title: "Clairières dans le ciel",
    year: "1914",
    category: "Voice",
    instrumentation: { en: "Voice and piano", fr: "Voix et piano", de: "Singstimme und Klavier" },
    text: { en: "Francis Jammes", fr: "Francis Jammes", de: "Francis Jammes" },
  },
  {
    id: "piece",
    title: "Pièce",
    year: "c. 1910",
    category: "Piano",
    instrumentation: { en: "Piano", fr: "Piano", de: "Klavier" },
    imslpUrl: "https://imslp.org/wiki/Pi%C3%A8ce_(Boulanger,_Lili)",
    pdfUrl: "https://ks15.imslp.org/files/imglnks/usimg/6/6f/IMSLP975917-PMLP1475962-Piece_-_Full_Score_(2025_Hachem).pdf",
  },
  {
    id: "psaume-24",
    title: "Psaume 24",
    year: "1916",
    category: "Choral",
    instrumentation: {
      en: "Chorus, organ and orchestra",
      fr: "Chœur, orgue et orchestre",
      de: "Chor, Orgel und Orchester",
    },
    text: { en: "Psalm 24", fr: "Psaume 24", de: "Psalm 24" },
  },
  {
    id: "psaume-129",
    title: "Psaume 129",
    year: "1916",
    category: "Choral",
    instrumentation: {
      en: "Baritone and orchestra",
      fr: "Baryton et orchestre",
      de: "Bariton und Orchester",
    },
    text: { en: "Psalm 129", fr: "Psaume 129", de: "Psalm 129" },
  },
  {
    id: "dans-limmense-tristesse",
    title: "Dans l'immense tristesse",
    year: "1916",
    category: "Voice",
    instrumentation: { en: "Voice and piano", fr: "Voix et piano", de: "Singstimme und Klavier" },
    text: {
      en: "Bertha Galeron de Calonne",
      fr: "Bertha Galeron de Calonne",
      de: "Bertha Galeron de Calonne",
    },
  },
  {
    id: "psaume-130",
    title: "Psaume 130",
    year: "1917",
    category: "Choral",
    instrumentation: {
      en: "Two solo voices, chorus, organ and orchestra",
      fr: "Deux voix solistes, chœur, orgue et orchestre",
      de: "Zwei Solostimmen, Chor, Orgel und Orchester",
    },
    text: { en: "Psalm 130", fr: "Psaume 130", de: "Psalm 130" },
  },
  {
    id: "vieille-priere-bouddhique",
    title: "Vieille prière bouddhique",
    year: "1917",
    category: "Choral",
    instrumentation: {
      en: "Tenor, chorus and orchestra",
      fr: "Ténor, chœur et orchestre",
      de: "Tenor, Chor und Orchester",
    },
    text: {
      en: "Extract from the Metta Sutta",
      fr: "Extrait du Metta Sutta",
      de: "Auszug aus dem Metta-Sutta",
    },
  },
  {
    id: "dun-matin-de-printemps",
    title: "D'un matin de printemps",
    year: "1918",
    category: "Chamber",
    instrumentation: { en: "Violin and piano", fr: "Violon et piano", de: "Violine und Klavier" },
  },
  {
    id: "pie-jesu",
    title: "Pie Jesu",
    year: "1918",
    category: "Chamber",
    instrumentation: {
      en: "Voice, string quartet, harp and organ",
      fr: "Voix, quatuor à cordes, harpe et orgue",
      de: "Singstimme, Streichquartett, Harfe und Orgel",
    },
    text: {
      en: "Tridentine Missal",
      fr: "Missel tridentin",
      de: "Tridentinisches Messbuch",
    },
  },
  {
    id: "dun-soir-triste",
    title: "D'un soir triste",
    year: "1918",
    category: "Chamber",
    instrumentation: { en: "Orchestra", fr: "Orchestre", de: "Orchester" },
  },
];

/** The unflattened catalogue, in every language — read by the admin console. */
export const liliSource: readonly LiliWorkSource[] = source;

/** The order the categories are listed in, when a work exists in them. */
export const liliCategoryOrder: LiliCategory[] = [
  "Piano",
  "Chamber",
  "Voice",
  "Choral",
];

/** Flatten the catalogue to a single language. */
export function getLiliWorks(lang: Lang): LiliWork[] {
  return source.map((w) => ({
    id: w.id,
    title: w.title,
    year: w.year,
    category: w.category,
    instrumentation: w.instrumentation[lang],
    text: w.text ? w.text[lang] : undefined,
    edition:
      w.imslpUrl || w.pdfUrl
        ? { imslp: w.imslpUrl, pdf: w.pdfUrl }
        : undefined,
  }));
}
