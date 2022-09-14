import PropTypes from "prop-types";
import './SectionCover.css';

function SectionCover({ image, text, alt }) {
  return (
    <div className="app__cover">
      <img className="app__cover-img" src={image} alt={alt} />
      <h2 className="app__cover-h2">{text}</h2>
    </div>
  )
}

SectionCover.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  alt: PropTypes.string
}

export default SectionCover;
