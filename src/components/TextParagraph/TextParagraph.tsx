import React from "react";
import './TextParagraph.css';

interface TextParagraphProps {
  text: string
}


export const TextParagraph: React.FC<TextParagraphProps> = ({ text }) => {
  return (
    <div className="app__about">
      <p className="app__about-text">{text}</p>
    </div>
  )
}
