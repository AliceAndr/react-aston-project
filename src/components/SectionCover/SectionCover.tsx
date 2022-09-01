import React from "react";
import './SectionCover.css';

export interface SectionCoverProps {
  text: string;
  image: string;
  alt: string
}

const SectionCover:React.FC<SectionCoverProps> = ({image, text, alt}) => {
  return (
    <div className="app__cover">
      <img className="app__cover-img" src={image} alt={alt} />
      <h2 className="app__cover-h2">{text}</h2>
    </div>
  )
}

export default SectionCover;
