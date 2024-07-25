import { ReactNode } from "react";

export const formatTextWithParagraphs = (text: string): ReactNode[] => {
  const formattedText = text
    .split(/\r?\n\r?\n/)
    .map((line, index) => <p key={index}>{line}</p>);

  return formattedText;
};
