import { Fragment, ReactNode } from "react";
import { MathText } from "../..";

export function renderHighlightedFormulas(text: string) {
  const regex = /\p{sc=Cyrillic}|[зу]{2,}/giu;

  const matches = [...text.matchAll(regex)];
  const nodes: ReactNode[] = [];

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const cyryllicText = match[0];
    const currentMatchIndex = match.index;
    const nextMatchIndex = matches[i + 1]?.index;

    if (i === 0) {
      const beforeFirstMatch = text.slice(0, currentMatchIndex);
      nodes.push(<MathText key={`${i}-before`}>{beforeFirstMatch}</MathText>);
    }

    nodes.push(<Fragment key={`${i}-cyryllic`}>{cyryllicText}</Fragment>);

    if (nextMatchIndex) {
      const betweenMatches = text.slice(
        currentMatchIndex! + cyryllicText.length,
        nextMatchIndex
      );
      nodes.push(<MathText key={`${i}-between`}>{betweenMatches}</MathText>);
    }

    if (i === matches.length - 1) {
      const afterLastMatch = text.slice(
        currentMatchIndex! + cyryllicText.length
      );
      nodes.push(<MathText key={`${i}-after`}>{afterLastMatch}</MathText>);
    }
  }

  return nodes;
}
