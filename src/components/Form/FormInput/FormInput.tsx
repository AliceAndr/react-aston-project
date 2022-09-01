import React, { useState } from "react";
import "./FormInput.css";

interface FormInputProps {
  id: number,
  value: any,
  name: string,
  type: string,
  placeholder: string,
  errorMessage: string,
  label: string,
  pattern: string | undefined,
  required: boolean,
  onChange: (e: React.SyntheticEvent) => void
}

const FormInput:React.FC<FormInputProps> = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e: React.SyntheticEvent) => {
    setFocused(true);
  };

  return (
    <div className="app__formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        data-focused = {focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
