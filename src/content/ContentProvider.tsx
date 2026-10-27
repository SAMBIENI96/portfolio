"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Content } from "./types";

// Donne aux composants clients le contenu de la langue de la page.
const ContentContext = createContext<Content | null>(null);

export function ContentProvider({ content, children }: { content: Content; children: ReactNode }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(): Content {
  const content = useContext(ContentContext);
  if (!content) throw new Error("useContent doit être utilisé dans un ContentProvider");
  return content;
}
