import fr from "./fr";
import en from "./en";
import type { Content } from "./types";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

const contents: Record<Locale, Content> = { fr, en };

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const getContent = (locale: Locale): Content => contents[locale];

export type { Content, Project } from "./types";
