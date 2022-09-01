import React from "react";
import './TextParagraph.css';

export interface TextParagraphProps {
  text: string
}


const TextParagraph:React.FC<TextParagraphProps> = ({text}) => {
  return (
    <div className="app__about">
      <p className="app__about-text">{text}</p>
    </div>
  )
}

export default TextParagraph;
