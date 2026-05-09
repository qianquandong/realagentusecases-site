import type { Locale } from "@/lib/config";
import type { Dict } from "./types";
import { en } from "./en";
import { zh } from "./zh";

const dictionaries: Record<Locale, Dict> = { en, zh };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export type { Dict };
