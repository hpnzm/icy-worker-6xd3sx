"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { JetBrains_Mono, Work_Sans } from "next/font/google";

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
});
const fontSans = Work_Sans({
  subsets: ["latin"],
});

const FontContext = createContext<{
  fontClassName: string;
  onToggleFont: () => void;
} | null>(null);

function FontProvider({ children }: { children: ReactNode }) {
  const [fontClassName, setFontClassName] = useState(fontMono.className);

  function onToggleFont() {
    if (fontClassName === fontMono.className) {
      setFontClassName(fontSans.className);
    } else {
      setFontClassName(fontMono.className);
    }
  }

  return (
    <FontContext.Provider value={{ fontClassName, onToggleFont }}>
      <Font>{children}</Font>
    </FontContext.Provider>
  );
}

function Font({ children }: { children: ReactNode }) {
  const context = useContext(FontContext);
  return <main className={context?.fontClassName}>{children}</main>;
}

function ToggleButton() {
  const context = useContext(FontContext);
  return (
    <button
      className="bg-black px-4 h-8 rounded-md border border-white"
      onClick={context?.onToggleFont}
    >
      TOGGLE FONT
    </button>
  );
}

export { FontProvider, ToggleButton };
