import React from "react";

interface HighlightedProps {
  text: string;
}

const Highlighted: React.FC<HighlightedProps> = ({ text }) => {
  let html = text;
  html = html.replaceAll("[", "<em>");
  html = html.replaceAll("]", "</em>");

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Highlighted;
