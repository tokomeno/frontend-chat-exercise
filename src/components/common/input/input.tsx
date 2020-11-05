import React from 'react';
import classNames from 'classnames';

interface Props {
  hasError?: boolean;
  onkeyup?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  errors?: string[];
  placeholder?: string;
  name?: string;
  useRef?: React.RefObject<any> | undefined | any;
  className?: string;
  required?: boolean;
  style?: React.CSSProperties;
}

export const Input: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  useRef,
  name,
  type = 'text',
  className,
  onkeyup,
  onKeyPress,
  required,
  style,
}) => {
  return (
    <>
      <input
        style={style}
        required={required}
        onKeyUp={onkeyup}
        onKeyPress={onKeyPress}
        name={name}
        ref={useRef}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={classNames('form-control', className)}
      />
    </>
  );
};
