import PropTypes from "prop-types";
import './TextParagraph.css';

function TextParagraph({ text }) {
  return (
    <div className="app__about">
      <p className="app__about-text"> {text} </p>
    </div>
  )
}

TextParagraph.propTypes = {
  text: PropTypes.string,
};

export default TextParagraph;
