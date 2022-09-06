import React, {useState} from 'react';

interface CheckboxProps {
  type?: string,
  name?: string,
  checked?: boolean,
  value?: any,
  onChange?: (e: React.SyntheticEvent) => void,
}

export const Checkbox: React.FC<CheckboxProps> = ({ type, name, value, checked, onChange }) => (
  <input type={type} name={name} checked={checked} value={value} onChange={onChange} />
);
