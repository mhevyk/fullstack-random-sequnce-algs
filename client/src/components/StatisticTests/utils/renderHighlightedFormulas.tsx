import { Fragment, ReactNode } from "react";
import { MathText } from "../..";

export function renderHighlightedFormulas(text: string) {
  const regex = /(,? ?\p{sc=Cyrillic},? ?)+/giu; // Updated regex to match Cyrillic characters only

  const matches = [...text.matchAll(regex)];
  const nodes: ReactNode[] = [];

  let currentIndex = 0; // Track the current index within the text

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const cyrillicText = match[0];

    // Check if there is non-matching text between this match and the previous one
    if (match.index! > currentIndex) {
      const nonMatchingText = text.slice(currentIndex, match.index);
      nodes.push(<MathText key={`${i}-before`}>{nonMatchingText}</MathText>);
    }

    nodes.push(<Fragment key={`${i}-cyrillic`}>{cyrillicText}</Fragment>);

    currentIndex = match.index! + cyrillicText.length;
  }

  // Check if there is text after the last match
  if (currentIndex < text.length) {
    const afterLastMatch = text.slice(currentIndex);
    nodes.push(
      <MathText key={`${matches.length}-after`}>{afterLastMatch}</MathText>
    );
  }

  return <span className="highlighted-formulas">{nodes}</span>;
}
